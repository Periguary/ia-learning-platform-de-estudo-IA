import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import {
  saveAIConversation,
  getAIConversationsForUserAndModule,
  clearAIConversationsForUserAndModule,
  getApprovedAIUpdateCandidates,
  getPendingAIUpdateCandidates,
  getUserRadarFavorites,
  toggleUserRadarFavorite,
  updateAIUpdateCandidateStatus,
  getUserLibraryFavorites,
  toggleUserLibraryFavorite,
  getLibraryReviews,
  addLibraryReview,
  getVideoNotes,
  getAllVideoNotes,
  addVideoNote,
  deleteVideoNote,
  saveExplanation,
  getSavedExplanations,
} from "./db";
import { curateAIUpdates } from "./aiUpdates";

const assistantHistorySchema = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(2_000),
  })
).max(8);

const extractText = (content: string | Array<{ type: string; text?: string }>) => {
  if (typeof content === "string") return content.trim();
  return content
    .filter(part => part.type === "text" && part.text)
    .map(part => part.text ?? "")
    .join("\n")
    .trim();
};

const assistantPrompt = `Você é um Professor Titular de Inteligência Artificial e Engenharia de Software na IA Academy, uma plataforma educacional de elite em português do Brasil.

Seu objetivo é conduzir o aluno como um mentor humano dedicado, explicativo e altamente didático, como se estivesse na frente de um aluno em uma aula particular ou sala de aula universitária de excelência.

### Diretrizes Pedagógicas
1. **Abordagem Didática e Progressiva:** Explique conceitos complexos dividindo-os em partes simples. Use analogias intuitivas do mundo real, intuição matemática acessível e intuição computacional antes de entrar em fórmulas ou sintaxe densas.
2. **Modo Aula Completa / Aprofundamento:** Quando o aluno pedir uma explicação ampla, uma aula detalhada ou fizer uma pergunta conceitual ("O que é...", "Como funciona..."), estruture sua resposta como uma mini-aula estructurada em:
   - **Introdução e Intuição:** O que é e por que isso importa no mundo real.
   - **Como Funciona na Prática:** O mecanismo passo a passo.
   - **Exemplo Prático ou Código Explicado:** Demonstração comentada.
   - **Check de Compreensão / Pergunta Desafiadora:** Uma pergunta final para testar o entendimento do aluno.
3. **Uso de Contexto e Limites:** Baseie-se estritamente no contexto do módulo, aula atual e anotações pessoais do aluno fornecidas. Se a dúvida estiver fora do contexto, oriente o aluno com carinho sobre qual tópico da grade curricular ele deve revisar.
4. **Tom Encorajador:** Valorize o raciocínio do aluno, corrija equívocos com paciência e estimule a curiosidade científica.

No final de cada explicação, inclua obrigatoriamente uma seção intitulada "### Materiais e Aulas Recomendadas" contendo 1 ou 2 sugestões práticas de aprofundamento (leituras, artigos recomendados na Biblioteca da plataforma ou vídeo-aulas complementares).`;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  ai: router({
    ask: publicProcedure
      .input(z.object({
        moduleId: z.string().trim().min(1).max(120),
        courseTitle: z.string().trim().min(1).max(200),
        courseDescription: z.string().trim().max(1_000),
        lessonTitle: z.string().trim().max(300).optional(),
        lessonContent: z.string().trim().max(10_000).optional(),
        studentNotes: z.string().trim().max(12_000).optional(),
        question: z.string().trim().min(1, "Escreva uma dúvida antes de enviar.").max(2_000),
        history: assistantHistorySchema.default([]),
      }))
      .mutation(async ({ input, ctx }) => {
        const storedNotes = ctx.user?.id && input.moduleId.startsWith("video-")
          ? await getVideoNotes(ctx.user.id, input.moduleId.slice("video-".length))
          : [];
        const notesContext = storedNotes.length > 0
          ? storedNotes.map(note => `[${Math.floor(note.timestampSeconds / 60)}:${String(note.timestampSeconds % 60).padStart(2, "0")}] ${note.noteText}`).join("\n")
          : input.studentNotes || "Nenhuma anotação pessoal disponível para esta aula.";
        const context = [
          `Módulo: ${input.courseTitle} (${input.moduleId})`,
          `Descrição: ${input.courseDescription || "Não informada"}`,
          input.lessonTitle ? `Aula atual: ${input.lessonTitle}` : "Aula atual: visão geral do módulo",
          input.lessonContent ? `Conteúdo didático disponível:\n${input.lessonContent}` : "Conteúdo didático específico não selecionado.",
          `Anotações pessoais do aluno (material privado, use apenas para personalizar a resposta):\n${notesContext}`,
        ].join("\n\n");

        try {
          const response = await invokeLLM({
            model: "gpt-5-mini",
            maxTokens: 1100,
            messages: [
              { role: "system", content: assistantPrompt },
              { role: "system", content: `Contexto autorizado para esta resposta:\n${context}` },
              ...input.history,
              { role: "user", content: input.question },
            ],
          });

          const content = response.choices[0]?.message?.content;
          const answer = content ? extractText(content) : "";
          if (!answer) {
            throw new Error("O modelo não retornou uma resposta textual.");
          }

          // Salvar no histórico se o usuário estiver autenticado
          if (ctx.user?.id) {
            await saveAIConversation({
              userId: ctx.user.id,
              moduleId: input.moduleId,
              lessonTitle: input.lessonTitle || null,
              question: input.question,
              answer,
              recommendations: "Materiais complementares sugeridos pela IA",
            });
          }

          return { answer };
        } catch (error) {
          console.error("AI assistant request failed", error);
          throw new Error("Não foi possível responder agora. Revise o conteúdo da aula e tente novamente em alguns instantes.");
        }
      }),
    generateQuiz: publicProcedure
      .input(z.object({
        moduleId: z.string().trim().min(1).max(120),
        courseTitle: z.string().trim().min(1).max(200),
        lessonTitle: z.string().trim().max(300).optional(),
        lessonContent: z.string().trim().max(10_000).optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            model: "gpt-5-mini",
            maxTokens: 1200,
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "quiz_schema",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    quizTitle: { type: "string" },
                    questions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          question: { type: "string" },
                          options: {
                            type: "array",
                            items: { type: "string" },
                            minItems: 4,
                            maxItems: 4
                          },
                          correctIndex: { type: "integer", minimum: 0, maximum: 3 },
                          explanation: { type: "string" }
                        },
                        required: ["question", "options", "correctIndex", "explanation"],
                        additionalProperties: false
                      },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ["quizTitle", "questions"],
                  additionalProperties: false
                }
              }
            },
            messages: [
              {
                role: "system",
                content: "Você é um professor titular e especialista em avaliação educacional de IA. Crie um quiz desafiador e didático com exatamente 3 perguntas de múltipla escolha (4 opções cada, com apenas uma correta) testando o conhecimento do aluno sobre o tópico fornecido. Responda estritamente em JSON válido conforme o esquema."
              },
              {
                role: "user",
                content: `Curso: ${input.courseTitle}\nTópico/Aula: ${input.lessonTitle || input.moduleId}\nConteúdo de referência:\n${input.lessonContent || "Conceitos fundamentais do módulo"}`
              }
            ]
          });
          const content = response.choices[0]?.message?.content;
          const parsed = JSON.parse(content ? extractText(content) : "{}");
          return parsed as {
            quizTitle: string;
            questions: Array<{
              question: string;
              options: string[];
              correctIndex: number;
              explanation: string;
            }>;
          };
        } catch (error) {
          console.error("Failed to generate quiz", error);
          throw new Error("Não foi possível gerar o quiz interativo agora. Tente novamente em instantes.");
        }
      }),
    summarizeNotes: publicProcedure
      .input(z.object({
        videoId: z.string().trim().min(1).max(128),
        videoTitle: z.string().trim().min(1).max(300),
        mode: z.enum(["summary", "guide"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para gerar um resumo personalizado.");
        const notes = await getVideoNotes(ctx.user.id, input.videoId);
        if (notes.length === 0) throw new Error("Salve pelo menos uma anotação antes de gerar o material.");
        const notesText = notes
          .map(note => `[${Math.floor(note.timestampSeconds / 60)}:${String(note.timestampSeconds % 60).padStart(2, "0")}] ${note.noteText}`)
          .join("\n");
        const task = input.mode === "summary"
          ? "Crie um resumo didático e estruturado, destacando conceitos, relações entre ideias e dúvidas que o aluno deveria revisar."
          : "Crie um guia de estudos prático com objetivos, sequência de revisão, perguntas de autoavaliação e um pequeno exercício. Não invente conteúdo fora das notas."
        const response = await invokeLLM({
          model: "gpt-5-mini",
          maxTokens: 1200,
          messages: [
            { role: "system", content: "Você é um orientador pedagógico da IA Academy. Responda em português do Brasil, usando somente as anotações do aluno. Preserve os timestamps quando forem úteis e deixe claro quando algo não estiver nas notas." },
            { role: "user", content: `Vídeo: ${input.videoTitle}\n\nAnotações do aluno:\n${notesText}\n\nTarefa: ${task}` },
          ],
        });
        const content = response.choices[0]?.message?.content;
        const answer = content ? extractText(content) : "";
        if (!answer) throw new Error("Não foi possível gerar o material a partir das anotações.");
        return { answer };
      }),
    history: publicProcedure
      .input(z.object({
        moduleId: z.string().trim().min(1).max(120),
      }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user?.id) return [];
        return await getAIConversationsForUserAndModule(ctx.user.id, input.moduleId);
      }),
    clearHistory: publicProcedure
      .input(z.object({
        moduleId: z.string().trim().min(1).max(120),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) return { success: false } as const;
        await clearAIConversationsForUserAndModule(ctx.user.id, input.moduleId);
        return { success: true } as const;
      }),
    saveExplanation: publicProcedure
      .input(z.object({
        title: z.string().trim().min(1).max(300),
        content: z.string().trim().min(1).max(20_000),
        moduleId: z.string().trim().min(1).max(120),
        category: z.string().trim().min(1).max(80).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para salvar explicações na Lista de Leitura.");
        await saveExplanation(ctx.user.id, input.title, input.content, input.moduleId, input.category ?? "Geral");
        return { success: true } as const;
      }),
    savedExplanations: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) return [];
      return await getSavedExplanations(ctx.user.id);
    }),
    updates: publicProcedure.query(async () => {
      return await getApprovedAIUpdateCandidates();
    }),
    pendingUpdates: adminProcedure.query(async () => {
      return await getPendingAIUpdateCandidates();
    }),
    refreshUpdates: adminProcedure.mutation(async () => {
      return await curateAIUpdates();
    }),
    reviewUpdate: adminProcedure
      .input(z.object({
        id: z.number().int().positive(),
        status: z.enum(["approved", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        await updateAIUpdateCandidateStatus(input.id, input.status);
        return { success: true } as const;
      }),
    radarFavorites: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) return [];
      return await getUserRadarFavorites(ctx.user.id);
    }),
    toggleRadarFavorite: publicProcedure
      .input(z.object({
        radarItemId: z.string().trim().min(1).max(180),
        title: z.string().trim().min(1).max(300),
        summary: z.string().trim().min(1).max(5_000),
        category: z.string().trim().min(1).max(80),
        sourceName: z.string().trim().min(1).max(160),
        sourceUrl: z.string().url().max(500),
        relatedModules: z.array(z.string().trim().min(1).max(120)).min(1).max(10),
        learningAction: z.string().trim().min(1).max(2_000),
        publishedAt: z.string().trim().max(40).nullable().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para salvar atualizações do Radar.");
        const isFavorited = await toggleUserRadarFavorite(ctx.user.id, {
          userId: ctx.user.id,
          radarItemId: input.radarItemId,
          title: input.title,
          summary: input.summary,
          category: input.category,
          sourceName: input.sourceName,
          sourceUrl: input.sourceUrl,
          relatedModules: JSON.stringify(input.relatedModules),
          learningAction: input.learningAction,
          publishedAt: input.publishedAt ?? null,
        });
        return { isFavorited };
      }),
    favorites: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) return [];
      return await getUserLibraryFavorites(ctx.user.id);
    }),
    toggleFavorite: publicProcedure
      .input(z.object({ libraryItemId: z.string().trim().min(1).max(120) }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para favoritar itens.");
        const isFavorited = await toggleUserLibraryFavorite(ctx.user.id, input.libraryItemId);
        return { isFavorited };
      }),
    reviews: publicProcedure
      .input(z.object({ libraryItemId: z.string().trim().min(1).max(120) }))
      .query(async ({ input }) => {
        return await getLibraryReviews(input.libraryItemId);
      }),
    addReview: publicProcedure
      .input(z.object({
        libraryItemId: z.string().trim().min(1).max(120),
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().min(3, "O comentário deve ter pelo menos 3 caracteres.").max(1_000),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para enviar avaliações.");
        await addLibraryReview({
          libraryItemId: input.libraryItemId,
          userId: ctx.user.id,
          userName: ctx.user.name || "Estudante IA Academy",
          rating: input.rating,
          comment: input.comment,
        });
        return { success: true };
      }),
  }),

  videoNotes: router({
    list: publicProcedure
      .input(z.object({ videoId: z.string().min(1).max(128) }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user?.id) return [];
        return getVideoNotes(ctx.user.id, input.videoId);
      }),
    all: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) return [];
      return getAllVideoNotes(ctx.user.id);
    }),
    add: publicProcedure
      .input(z.object({ videoId: z.string().min(1).max(128), timestampSeconds: z.number().int().min(0), noteText: z.string().trim().min(1).max(2_000) }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para salvar anotações.");
        return addVideoNote(ctx.user.id, input.videoId, input.timestampSeconds, input.noteText);
      }),
    remove: publicProcedure
      .input(z.object({ noteId: z.number().int(), videoId: z.string().min(1).max(128) }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.id) throw new Error("Faça login para remover anotações.");
        return deleteVideoNote(ctx.user.id, input.noteId, input.videoId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
