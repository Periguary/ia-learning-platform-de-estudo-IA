// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({
  useLocation: () => ["/library?query=transformer", vi.fn()],
}));

const openMock = vi.fn();

vi.mock("@/components/AIAssistantBox", () => ({
  AIAssistantBox: () => <div data-testid="assistant-placeholder">Tutor IA</div>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    useUtils: () => ({}),
    ai: {
      favorites: { useQuery: () => ({ data: ["deep-learning-book-goodfellow"], refetch: vi.fn() }) },
      toggleFavorite: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
      reviews: { useQuery: () => ({ data: [], refetch: vi.fn() }) },
      addReview: { useMutation: () => ({ mutate: vi.fn(), isPending: false }) },
    },
  },
}));

describe("Library export interactions", () => {
  beforeEach(() => {
    openMock.mockClear();
    vi.stubGlobal("open", openMock);
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:ia-academy"),
      revokeObjectURL: vi.fn(),
    });
  });

  it("oferece a Lista de Leitura e abre o Google Colab após gerar o notebook", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    expect(screen.getByRole("button", { name: /Lista de Leitura \(1\)/i })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Google Colab" }));

    expect(openMock).toHaveBeenCalledWith("https://colab.research.google.com/", "_blank", "noopener,noreferrer");
    expect(screen.getByText(/Notebook \.ipynb baixado/i)).toBeTruthy();
  });

  it("oferece destino do Google Drive para o arquivo exportado", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    fireEvent.click(screen.getAllByRole("button", { name: "Google Drive" })[0]);

    expect(openMock).toHaveBeenCalledWith("https://drive.google.com/drive/my-drive", "_blank", "noopener,noreferrer");
    expect(screen.getByText(/Arquivo Markdown baixado/i)).toBeTruthy();
  });

  it("lê query da URL, preenche a busca e filtra o catálogo", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    expect((await screen.findAllByDisplayValue("transformer")).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: "Attention Is All You Need" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: "Deep Learning Book (MIT Press)" })).toBeNull();
  });
});
