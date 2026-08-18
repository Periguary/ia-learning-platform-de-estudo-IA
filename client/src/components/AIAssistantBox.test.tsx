/** @vitest-environment jsdom */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mutationState = vi.hoisted(() => ({
  mutate: vi.fn(),
  reset: vi.fn(),
}));

const clearHistoryState = vi.hoisted(() => ({
  mutate: vi.fn(),
}));

vi.mock("@/components/AIChatBox", () => ({
  AIChatBox: ({
    messages,
    onSendMessage,
    placeholder,
    suggestedPrompts,
  }: {
    messages: Array<{ role: string; content: string }>;
    onSendMessage: (content: string) => void;
    placeholder: string;
    suggestedPrompts?: string[];
  }) => (
    <div>
      <div>{messages.map((message, index) => <p key={`${message.role}-${index}`}>{message.content}</p>)}</div>
      {suggestedPrompts?.map(prompt => (
        <button key={prompt} onClick={() => onSendMessage(prompt)}>{prompt}</button>
      ))}
      <input
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={(event) => {
          (event.currentTarget as HTMLInputElement).dataset.value = event.currentTarget.value;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSendMessage((event.currentTarget as HTMLInputElement).dataset.value ?? "");
        }}
      />
    </div>
  ),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    ai: {
      history: {
        useQuery: () => ({ isLoading: false, data: [], refetch: vi.fn() }),
      },
      clearHistory: {
        useMutation: () => ({
          isPending: false,
          mutate: (input: unknown) => clearHistoryState.mutate(input),
        }),
      },
      ask: {
        useMutation: (options: { onSuccess?: (result: { answer: string }) => void }) => ({
          isPending: false,
          reset: mutationState.reset,
          mutate: (input: unknown) => {
            mutationState.mutate(input);
            options.onSuccess?.({ answer: "A magnitude mede o comprimento do vetor." });
          },
        }),
      },
      generateQuiz: {
        useMutation: () => ({
          isPending: false,
          mutate: vi.fn(),
        }),
      },
      saveExplanation: {
        useMutation: () => ({
          isPending: false,
          mutate: vi.fn(),
        }),
      },
    },
  },
}));

import { AIAssistantBox } from "./AIAssistantBox";

describe("AIAssistantBox", () => {
  beforeEach(() => {
    cleanup();
    mutationState.mutate.mockClear();
    mutationState.reset.mockClear();
    clearHistoryState.mutate.mockClear();
  });

  it("envia a dúvida com o contexto da aula e mostra a resposta", () => {
    render(
      <AIAssistantBox
        moduleId="linear-algebra"
        courseTitle="Álgebra Linear"
        courseDescription="Fundamentos de vetores e matrizes"
        lessonTitle="Conceito de Vetor"
        lessonContent="Um vetor representa direção e magnitude."
      />,
    );

    const input = screen.getByPlaceholderText("Digite sua dúvida sobre esta aula...");
    fireEvent.change(input, { target: { value: "O que é magnitude?" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mutationState.mutate).toHaveBeenCalledWith(expect.objectContaining({
      moduleId: "linear-algebra",
      lessonTitle: "Conceito de Vetor",
      lessonContent: "Um vetor representa direção e magnitude.",
      question: "O que é magnitude?",
    }));
    expect(screen.getByText("A magnitude mede o comprimento do vetor.")).toBeTruthy();
  });

  it("limpa a conversa ao iniciar um novo tópico sem apagar o histórico salvo", () => {
    render(
      <AIAssistantBox
        moduleId="linear-algebra"
        courseTitle="Álgebra Linear"
        courseDescription="Fundamentos de vetores e matrizes"
        lessonTitle="Conceito de Vetor"
        lessonContent="Um vetor representa direção e magnitude."
      />,
    );

    const input = screen.getByPlaceholderText("Digite sua dúvida sobre esta aula...");
    fireEvent.change(input, { target: { value: "Dúvida temporária" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Dúvida temporária")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Novo Tópico" }));
    expect(screen.queryByText("Dúvida temporária")).toBeNull();
  });

  it("chama a mutação ao limpar o histórico salvo do módulo", () => {
    render(
      <AIAssistantBox
        moduleId="linear-algebra"
        courseTitle="Álgebra Linear"
        courseDescription="Fundamentos de vetores e matrizes"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Limpar Histórico" }));
    expect(clearHistoryState.mutate).toHaveBeenCalledWith({ moduleId: "linear-algebra" });
  });

  it("oferece perguntas sugeridas no estado inicial", () => {
    render(
      <AIAssistantBox
        moduleId="linear-algebra"
        courseTitle="Álgebra Linear"
        courseDescription="Fundamentos de vetores e matrizes"
        lessonTitle="Conceito de Vetor"
        lessonContent="Um vetor representa direção e magnitude."
      />,
    );

    const prompt = screen.getByRole("button", { name: /Explique este conceito com uma analogia simples do mundo real/i });
    fireEvent.click(prompt);

    expect(mutationState.mutate).toHaveBeenCalledWith(expect.objectContaining({
      question: "Explique este conceito com uma analogia simples do mundo real.",
    }));
  });
});
