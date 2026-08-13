import { describe, expect, it, beforeEach, vi } from "vitest";
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

  it("oculta falhas internas do provedor em uma mensagem pedagógica", async () => {
    llmMock.invokeLLM.mockRejectedValue(new Error("upstream secret failure"));
    const caller = appRouter.createCaller(createContext());

    await expect(caller.ai.ask(baseInput)).rejects.toThrow(
      "Não foi possível responder agora. Revise o conteúdo da aula e tente novamente em alguns instantes."
    );
  });
});
