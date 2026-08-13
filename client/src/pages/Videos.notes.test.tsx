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
    },
    videoNotes: {
      list: { useQuery: () => ({ data: [{ id: 1, videoId: "google-generative-ai-intro", timestampSeconds: 65, noteText: "Conceito de Transformer", createdAt: new Date() }] }) },
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
  });
});
