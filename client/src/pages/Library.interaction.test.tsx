// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({
  useLocation: () => ["/library", vi.fn()],
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
  afterEach(() => cleanup());

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

  it("preenche a busca e filtra o catálogo", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    const search = screen.getAllByPlaceholderText("Buscar por título, autor ou assunto...").at(-1) as HTMLInputElement;
    fireEvent.change(search, { target: { value: "transformer" } });
    expect(screen.getAllByRole("heading", { name: "Attention Is All You Need" }).length).toBeGreaterThan(0);
    expect(screen.queryAllByRole("heading", { name: "Deep Learning Book (MIT Press)" })).toHaveLength(0);
  });

  it("filtra por formato e oferece ordenação da Biblioteca", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    const formatSelect = screen.getAllByLabelText("Filtrar por formato").at(-1) as HTMLSelectElement;
    fireEvent.change(formatSelect, { target: { value: "PDF" } });
    expect(screen.getAllByRole("heading", { name: "Deep Learning Book (MIT Press)" }).length).toBeGreaterThan(0);
    expect(screen.queryAllByRole("heading", { name: "Attention Is All You Need" })).toHaveLength(0);
    const sortSelect = screen.getAllByLabelText("Ordenar Biblioteca").at(-1) as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: "year-desc" } });
    expect(sortSelect.value).toBe("year-desc");
  });

  it("refina a busca por provedor e nível de dificuldade", async () => {
    const { default: Library } = await import("./Library");
    render(<Library />);

    fireEvent.change(screen.getByLabelText("Filtrar por provedor"), { target: { value: "OpenAI" } });
    expect(screen.getByRole("heading", { name: "GPT-4 Technical Report" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Llama 3 Open Foundation and Fine-Tuned Chat Models" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Filtrar por dificuldade"), { target: { value: "Fundamental" } });
    expect(screen.queryByRole("heading", { name: "GPT-4 Technical Report" })).toBeNull();
  });
});
