// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/updates", navigate],
}));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: undefined }),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    ai: {
      updates: {
        useQuery: () => ({ data: [], isLoading: false, refetch: vi.fn() }),
      },
      updateFavorites: {
        useQuery: () => ({ data: [], isLoading: false, refetch: vi.fn() }),
      },
      toggleUpdateFavorite: {
        useMutation: () => ({ isPending: false, mutate: vi.fn() }),
      },
      pendingUpdates: {
        useQuery: () => ({ data: [], isLoading: false, refetch: vi.fn() }),
      },
      refreshUpdates: {
        useMutation: () => ({ isPending: false, mutate: vi.fn(), data: undefined }),
      },
      reviewUpdate: {
        useMutation: () => ({ isPending: false, mutate: vi.fn() }),
      },
    },
  },
}));

import Updates from "./Updates";

describe("Updates interaction", () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  it("renderiza o catálogo editorial com fonte oficial, ação de revisão e favoritos", () => {
    render(<Updates />);

    expect(screen.getByRole("heading", { name: /Atualizações que viram aprendizado/i })).toBeTruthy();
    const openAiSource = screen.getByRole("link", { name: /Fonte: OpenAI News/i });
    expect(openAiSource).toBeTruthy();
    expect(openAiSource.getAttribute("href")).toBe("https://openai.com/news/");
    expect(screen.getAllByRole("button", { name: /Revisar LLMs/i }).length).toBeGreaterThan(0);
  });

  it("permite identificar o controle de salvar para leitura posterior", () => {
    render(<Updates />);
    expect(screen.getAllByRole("button", { name: /Favoritar/i }).length).toBeGreaterThan(0);
  });

  it("mantém as novidades acessíveis sem ativar a fila de curadoria para aluno anônimo", () => {
    render(<Updates />);

    expect(screen.queryByRole("button", { name: /Buscar novas atualizações/i })).toBeNull();
    expect(screen.queryByText(/Candidatos aguardando revisão/i)).toBeNull();
  });
});
