import { describe, expect, it, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const llmMock = vi.hoisted(() => ({
  invokeLLM: vi.fn(),
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: llmMock.invokeLLM,
}));

const createContext = (): TrpcContext => ({
  user: undefined,
  req: {
    protocol: "https",
    headers: {},
  } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

const baseInput = {
  moduleId: "linear-algebra",
  courseTitle: "Álgebra Linear",
  courseDescription: "Fundamentos de vetores e matrizes",
  lessonTitle: "Conceito de Vetor",
  lessonContent: "Um vetor representa direção e magnitude. Sua magnitude é calculada pela norma.",
  studentNotes: "Lembrar de comparar norma L2 com distância euclidiana.",
  question: "Por que a magnitude é importante?",
  history: [],
};

describe("ai.ask", () => {
  beforeEach(() => {
    llmMock.invokeLLM.mockReset();
  });

  it("envia o contexto da aula ao modelo e retorna uma resposta textual", async () => {
    llmMock.invokeLLM.mockResolvedValue({
      choices: [{ message: { content: "A magnitude mede o comprimento do vetor." } }],
    });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.ai.ask(baseInput);

    expect(result).toEqual({ answer: "A magnitude mede o comprimento do vetor." });
    expect(llmMock.invokeLLM).toHaveBeenCalledWith(expect.objectContaining({
      model: "gpt-5-mini",
      messages: expect.arrayContaining([
        expect.objectContaining({ content: expect.stringContaining("Conceito de Vetor") }),
        expect.objectContaining({ content: expect.stringContaining("direção e magnitude") }),
        expect.objectContaining({ content: expect.stringContaining("norma L2") }),
        expect.objectContaining({ content: baseInput.question }),
      ]),
    }));
  });

  it("recusa perguntas acima do limite definido", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.ai.ask({
      ...baseInput,
      question: "d".repeat(2_001),
    })).rejects.toThrow();
    expect(llmMock.invokeLLM).not.toHaveBeenCalled();
  });

  it("exige autenticação para gerar resumo personalizado das anotações", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.ai.summarizeNotes({
      videoId: "google-generative-ai-intro",
      videoTitle: "Introduction to Generative AI",
      mode: "summary",
    })).rejects.toThrow("Faça login para gerar um resumo personalizado.");
    expect(llmMock.invokeLLM).not.toHaveBeenCalled();
  });

  it("mantém uma migração não destrutiva para a memória contextual usada pelo Tutor", () => {
    const migration = readFileSync(new URL("../drizzle/0011_restore_student_memories.sql", import.meta.url), "utf8");
    expect(migration).toContain("CREATE TABLE IF NOT EXISTS `student_memories`");
    expect(migration).toContain("`userId` int NOT NULL");
    expect(migration).toContain("`topic` varchar(255) NOT NULL");
    expect(migration).not.toMatch(/DROP TABLE|DROP COLUMN|TRUNCATE/i);
  });

  it("oculta falhas internas do provedor em uma mensagem pedagógica", async () => {
    llmMock.invokeLLM.mockRejectedValue(new Error("upstream secret failure"));
    const caller = appRouter.createCaller(createContext());

    await expect(caller.ai.ask(baseInput)).rejects.toThrow(
      "Não foi possível responder agora. Revise o conteúdo da aula e tente novamente em alguns instantes."
    );
  });
});
