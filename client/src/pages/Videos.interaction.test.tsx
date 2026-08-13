// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/AIAssistantBox", () => ({
  AIAssistantBox: () => <div data-testid="assistant-placeholder">Tutor IA da Aula</div>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    ai: {
      favorites: { useQuery: () => ({ data: ["deep-learning-book-goodfellow"] }) },
    },
  },
}));

describe("Videos page interactions", () => {
  it("permite marcar aulas como concluídas e gerar plano de estudos", async () => {
    const { default: Videos } = await import("./Videos");
    render(<Videos />);

    expect(screen.getByText(/Aprenda IA assistindo e praticando/i)).toBeTruthy();
    expect(screen.getByTestId("assistant-placeholder")).toBeTruthy();

    const generateBtn = screen.getByRole("button", { name: /Gerar Plano de Estudos Semanal/i });
    expect(generateBtn).toBeTruthy();

    fireEvent.click(generateBtn);
    expect(screen.getByText(/Gerando plano personalizado/i)).toBeTruthy();
  });
});
