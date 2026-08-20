import React, { useEffect, useState } from "react";
import { Sparkles, History, BookMarked, Loader2, RotateCcw, Trash2, HelpCircle, CheckCircle2 } from "lucide-react";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

type AIAssistantBoxProps = {
  moduleId: string;
  courseTitle: string;
  courseDescription: string;
  lessonTitle?: string;
  lessonContent?: string;
  studentNotes?: string;
};

const defaultPrompts = [
  "Me dê uma aula completa explicando este conceito do zero.",
  "Explique este conceito com uma analogia simples do mundo real.",
  "Qual é o raciocínio passo a passo e quais erros devo evitar?",
  "Crie um exercício prático desafiador com gabarito explicado.",
];

export function AIAssistantBox({
  moduleId,
  courseTitle,
  courseDescription,
  lessonTitle,
  lessonContent,
  studentNotes,
}: AIAssistantBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<{
    quizTitle: string;
    questions: Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  } | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [personality, setPersonality] = useState<string>("padrao");
  const [studyPlanModalOpen, setStudyPlanModalOpen] = useState(false);
  const [studyPlanGoal, setStudyPlanGoal] = useState("");
  const [studyPlanResult, setStudyPlanResult] = useState<{ title: string; content: string } | null>(null);

  const studyPlanMutation = trpc.ai.generateStudyPlan.useMutation({
    onSuccess: (data) => {
      setStudyPlanResult(data);
    },
    onError: (err) => {
      alert(err.message || "Erro ao gerar plano de estudos.");
    }
  });

  const quizMutation = trpc.ai.generateQuiz.useMutation({
    onSuccess: (data) => {
      setQuizData(data);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizModalOpen(true);
    },
    onError: (err) => {
      alert(err.message || "Erro ao gerar quiz.");
    }
  });

  const historyQuery = trpc.ai.history.useQuery(
    { moduleId },
    { enabled: showHistory }
  );

  const clearHistoryMutation = trpc.ai.clearHistory.useMutation({
    onSuccess: () => {
      void historyQuery.refetch();
    },
  });

  const saveExplanationMutation = trpc.ai.saveExplanation.useMutation({
    onSuccess: () => {
      alert("Explicação salva na sua Lista de Leitura com sucesso!");
    },
    onError: (err) => {
      alert(err.message || "Faça login para salvar na Lista de Leitura.");
    },
  });

  const handleSaveExplanation = (content: string, category: string = "Conceitos") => {
    const title = lessonTitle ? `Aula: ${lessonTitle}` : `Tópico de ${courseTitle}`;
    saveExplanationMutation.mutate({
      title,
      content,
      moduleId,
      category,
    });
  };

  const exportChatPdf = () => {
    const chatText = messages
      .filter(m => m.role !== "system")
      .map(m => `${m.role === "user" ? "Aluno" : "Professor Virtual"}:\n${m.content}\n\n`)
      .join("---\n\n");
    if (!chatText) {
      alert("Nenhuma conversa para exportar ainda.");
      return;
    }
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Histórico do Professor Virtual — ${courseTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
    h1 { color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    .meta { color: #64748b; font-size: 14px; margin-bottom: 24px; }
    .msg { margin-bottom: 20px; padding: 16px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; }
    .msg.user { background: #f0f9ff; border-color: #bae6fd; }
    .role { font-weight: bold; margin-bottom: 6px; color: #0369a1; }
    .msg.user .role { color: #0369a1; }
  </style>
</head>
<body>
  <h1>Professor Virtual de IA — Histórico de Conversas</h1>
  <div class="meta">Curso: <strong>${courseTitle}</strong> | Aula: <strong>${lessonTitle || "Visão Geral"}</strong> | Data: ${new Date().toLocaleDateString()}</div>
  <hr style="border:0; border-top: 1px solid #cbd5e1; margin-bottom: 24px;">
  ${messages.filter(m => m.role !== "system").map(m => `
    <div class="msg ${m.role}">
      <div class="role">${m.role === "user" ? "Aluno" : "Professor Virtual"}</div>
      <div>${m.content.replace(/\n/g, "<br>")}</div>
    </div>
  `).join("")}
  <script>window.print();</script>
</body>
</html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(htmlContent);
      win.document.close();
    }
  };

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [useLocalOllama, setUseLocalOllama] = useState(false);

  const askMutation = trpc.ai.ask.useMutation({
    onSuccess: ({ answer }) => {
      // Simulate real-time streaming typewriter effect for natural experience
      setIsStreaming(true);
      setStreamingContent("");
      
      let index = 0;
      const speed = 12; // milliseconds per character
      const interval = setInterval(() => {
        if (index < answer.length) {
          setStreamingContent(prev => prev + answer.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
          setMessages(previous => [
            ...previous,
            { role: "assistant", content: answer },
          ]);
          setStreamingContent("");
        }
      }, speed);
    },
    onError: error => {
      setIsStreaming(false);
      setStreamingContent("");
      setMessages(previous => [
        ...previous,
        {
          role: "assistant",
          content: error.message || "Não consegui responder agora. Tente novamente em instantes.",
        },
      ]);
    },
  });

  useEffect(() => {
    setMessages([]);
    askMutation.reset();
  }, [moduleId, lessonTitle]);

  const handleSendMessage = (content: string) => {
    const previousConversation = messages
      .filter((message): message is Extract<Message, { role: "user" | "assistant" }> => message.role !== "system")
      .slice(-6);
    setMessages(previous => [
      ...previous,
      { role: "user", content },
    ]);

    askMutation.mutate({
      moduleId,
      courseTitle,
      courseDescription,
      lessonTitle,
      lessonContent,
      studentNotes,
      question: content,
      history: previousConversation,
      personality,
    });
  };

  const startNewTopic = () => {
    setMessages([]);
    askMutation.reset();
    setShowHistory(false);
  };

  const clearSavedHistory = () => {
    setMessages([]);
    askMutation.reset();
    setShowHistory(false);
    clearHistoryMutation.mutate({ moduleId });
  };

  const loadPastConversation = (q: string, a: string, pastLesson?: string | null) => {
    setMessages([
      { role: "user", content: `[Histórico - ${pastLesson || "Visão Geral"}] ${q}` },
      { role: "assistant", content: a },
    ]);
    setShowHistory(false);
  };

  return (
    <section
      aria-labelledby="ai-assistant-title"
      className="mt-6 overflow-hidden rounded-xl border border-primary/20 bg-card shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="size-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h2 id="ai-assistant-title" className="text-xl font-bold">
              Professor Virtual de IA
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Seu mentor dedicado para aulas particulares, explicações passo a passo e exercícios guiados sobre {lessonTitle ? `“${lessonTitle}”` : `o módulo ${courseTitle}`}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUseLocalOllama(prev => !prev)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
              useLocalOllama
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "bg-background text-muted-foreground border-border hover:border-primary/40"
            }`}
            title="Alternar entre Nuvem Padrão e API Local do Ollama (llama3)"
          >
            <span className={`size-2 rounded-full ${useLocalOllama ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground"}`} />
            {useLocalOllama ? "Ollama Local (Ativo)" : "Nuvem (Padrão)"}
          </button>
          <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-2 py-1">
            <span className="text-[11px] text-muted-foreground font-semibold">Estilo:</span>
            <select
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="bg-background text-foreground text-xs font-medium outline-none cursor-pointer"
              title="Escolha a personalidade do professor"
            >
              <option value="padrao">Padrão Didático</option>
              <option value="socratico">Socrático (Guiado)</option>
              <option value="bem-humorado">Bem-Humorado</option>
              <option value="rigoroso">Rigoroso / Acadêmico</option>
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
            onClick={() => setStudyPlanModalOpen(true)}
            title="Criar plano de estudos semanal personalizado com IA"
          >
            🎯 Plano de Estudos
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
            onClick={() => quizMutation.mutate({ moduleId, courseTitle, lessonTitle, lessonContent })}
            disabled={quizMutation.isPending}
            title="Gerar quiz interativo sob demanda com base nesta aula"
          >
            {quizMutation.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <HelpCircle className="size-3.5" />}
            Gerar Quiz
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
            onClick={exportChatPdf}
            title="Exportar conversa em PDF"
          >
            📥 Exportar PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs text-destructive hover:text-destructive"
            onClick={clearSavedHistory}
            disabled={clearHistoryMutation.isPending}
            title="Limpar Histórico"
          >
            {clearHistoryMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Limpar Histórico
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={startNewTopic}
            title="Começar um novo tópico sem apagar o histórico salvo"
          >
            <RotateCcw className="size-4" />
            Novo Tópico
          </Button>
        </div>
      </div>

      {showHistory ? (
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <BookMarked className="size-4 text-primary" />
            Conversas anteriores neste módulo
          </h3>
          {historyQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : historyQuery.data && historyQuery.data.length > 0 ? (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
              {historyQuery.data.map(item => (
                <div
                  key={item.id}
                  onClick={() => loadPastConversation(item.question, item.answer, item.lessonTitle)}
                  className="p-3 rounded-lg border border-border bg-muted/30 hover:border-primary/50 cursor-pointer transition-colors space-y-1 text-left"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{item.lessonTitle || "Geral do Módulo"}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">P: {item.question}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma conversa salva ainda. Tire dúvidas para construirmos seu histórico de revisão.
            </p>
          )}
        </div>
      ) : (
        <AIChatBox
          messages={
            isStreaming
              ? [...messages, { role: "assistant" as const, content: streamingContent }]
              : messages
          }
          onSendMessage={handleSendMessage}
          isLoading={askMutation.isPending && !isStreaming}
          placeholder="Digite sua dúvida sobre esta aula..."
          height="420px"
          emptyStateMessage="Pergunte ao tutor e receba explicações e links de materiais complementares."
          suggestedPrompts={defaultPrompts}
          className="rounded-none border-0 shadow-none"
          onSaveExplanation={handleSaveExplanation}
        />
      )}

      {/* Study Plan Modal */}
      {studyPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="futurist-panel max-w-xl w-full p-6 space-y-6 rounded-none border border-primary/40 bg-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Plano de Estudos Personalizado</span>
                <h3 className="text-xl font-bold mt-1">Gerador de Roteiro com IA</h3>
              </div>
              <button
                onClick={() => setStudyPlanModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            {studyPlanResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 border border-border rounded-lg max-h-80 overflow-y-auto text-sm">
                  <h4 className="font-bold text-primary mb-2">{studyPlanResult.title}</h4>
                  <div className="prose prose-sm dark:prose-invert">
                    <Streamdown>{studyPlanResult.content}</Streamdown>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setStudyPlanResult(null)}>
                    Criar Novo Plano
                  </Button>
                  <Button onClick={() => setStudyPlanModalOpen(false)}>
                    Concluir
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Área de Foco</label>
                  <input
                    type="text"
                    placeholder="Ex: Machine Learning em Produção, Fine-Tuning de LLMs..."
                    value={studyPlanGoal}
                    onChange={(e) => setStudyPlanGoal(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setStudyPlanModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => studyPlanMutation.mutate({ focusArea: lessonTitle || courseTitle, goal: studyPlanGoal || "Dominar os conceitos avançados de IA e aplicação prática" })}
                    disabled={studyPlanMutation.isPending}
                  >
                    {studyPlanMutation.isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                    Gerar Meu Plano Semanal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {quizModalOpen && quizData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="futurist-panel max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto rounded-none border border-primary/40 bg-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Quiz Interativo Sob Demanda</span>
                <h3 className="text-xl font-bold mt-1">{quizData.quizTitle}</h3>
              </div>
              <button
                onClick={() => setQuizModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {quizData.questions.map((q, qIndex) => {
                const isAnswered = selectedAnswers[qIndex] !== undefined;
                const isCorrect = selectedAnswers[qIndex] === q.correctIndex;
                return (
                  <div key={`quiz-q-${qIndex}`} className="p-4 border border-border bg-muted/20 space-y-3">
                    <p className="font-semibold text-sm">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="grid gap-2">
                      {q.options.map((option, optIndex) => {
                        let btnStyle = "border-border bg-card hover:bg-accent/50 text-foreground";
                        if (selectedAnswers[qIndex] === optIndex) {
                          btnStyle = "border-primary bg-primary/20 text-primary-foreground font-medium";
                        }
                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold";
                          } else if (selectedAnswers[qIndex] === optIndex && optIndex !== q.correctIndex) {
                            btnStyle = "border-destructive bg-destructive/20 text-destructive-foreground";
                          }
                        }
                        return (
                          <button
                            key={`opt-${optIndex}`}
                            onClick={() => {
                              if (!quizSubmitted) {
                                setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
                              }
                            }}
                            className={`w-full text-left p-3 rounded-none border text-xs sm:text-sm transition-colors ${btnStyle}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className="text-xs mt-2 p-2 rounded bg-muted text-muted-foreground border border-border">
                        <span className="font-semibold text-foreground">Explicação:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              {!quizSubmitted ? (
                <Button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                >
                  Enviar Respostas
                </Button>
              ) : (
                <Button onClick={() => setQuizModalOpen(false)}>
                  Concluir Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
