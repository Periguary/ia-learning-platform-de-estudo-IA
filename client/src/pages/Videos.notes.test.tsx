// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/AIAssistantBox", () => ({
  AIAssistantBox: () => <div data-testid="assistant-placeholder">Tutor IA</div>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    ai: {
      favorites: { useQuery: () => ({ data: [] }) },
      summarizeNotes: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
    },
    videoNotes: {
      list: { useQuery: () => ({ data: [{ id: 1, videoId: "google-generative-ai-intro", timestampSeconds: 65, noteText: "Conceito de Transformer", createdAt: new Date() }] }) },
      all: { useQuery: () => ({ data: [{ id: 1, videoId: "google-generative-ai-intro", timestampSeconds: 65, noteText: "Conceito de Transformer", createdAt: new Date() }] }) },
      add: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
      remove: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
    },
  },
}));

describe("Videos notes and Obsidian sync", () => {
  it("renderiza notas com timestamp e botões de exportação", async () => {
    const { default: Videos } = await import("./Videos");
    render(<Videos />);

    expect(screen.getByText(/Notebook LM da Aula & Obsidian Sync/i)).toBeTruthy();
    expect(screen.getByText(/Conceito de Transformer/i)).toBeTruthy();
    expect(screen.getByText(/1:05/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Baixar Markdown/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Emparelhar com Obsidian/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Exportar todas \(1\)/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Gerar Resumo IA/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Guia de Estudos/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Seções do PDF/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Preparar Gemini Notebook/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Seções do PDF/i }));
    const notesCheckbox = screen.getByLabelText(/Notas com timestamps/i) as HTMLInputElement;
    expect(notesCheckbox.checked).toBe(true);
    fireEvent.click(notesCheckbox);
    expect(notesCheckbox.checked).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: /1:05/i }));
    expect(screen.getByTitle("Introduction to Generative AI").getAttribute("src")).toContain("start=65");
  });
});
