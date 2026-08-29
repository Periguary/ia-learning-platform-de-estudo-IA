// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mutateTags = vi.fn();
const mutateBatch = vi.fn();
vi.mock("wouter", () => ({ useLocation: () => ["/updates", vi.fn()] }));
vi.mock("@/_core/hooks/useAuth", () => ({ useAuth: () => ({ user: { id: 1, role: "user" } }) }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    useUtils: () => ({ ai: { radarFavorites: { invalidate: vi.fn() } } }),
    ai: {
      updates: { useQuery: () => ({ data: [], refetch: vi.fn() }) },
      radarFavorites: { useQuery: () => ({ data: [{ radarItemId: "opencv-ai-competition-2026", title: "OpenCV", summary: "Resumo", category: "Open Source", sourceName: "OpenCV", sourceUrl: "https://opencv.org/", relatedModules: JSON.stringify(["computer-vision"]), learningAction: "Revisar", publishedAt: "2026-08-12", tags: JSON.stringify(["revisar"]) }] }) },
      toggleRadarFavorite: { useMutation: () => ({ isPending: false, mutate: vi.fn() }) },
      updateRadarFavoriteTags: { useMutation: () => ({ isPending: false, mutate: mutateTags }) },
      batchUpdateRadarFavoriteTags: { useMutation: () => ({ isPending: false, mutate: mutateBatch }) },
      pendingUpdates: { useQuery: () => ({ data: [], refetch: vi.fn() }) },
      refreshUpdates: { useMutation: () => ({ isPending: false, mutate: vi.fn() }) },
      reviewUpdate: { useMutation: () => ({ isPending: false, mutate: vi.fn() }) },
    },
  },
}));

import Updates from "./Updates";

describe("Updates tags", () => {
  it("mostra tags salvas, permite adicionar uma tag e salva a lista", () => {
    render(<Updates />);
    fireEvent.click(screen.getByRole("button", { name: /Salvas \(1\)/i }));
    expect(screen.getByRole("button", { name: /Remover tag revisar/i })).toBeTruthy();
    const input = screen.getByRole("textbox", { name: /Nova tag para OpenCV/i });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.change(input, { target: { value: "opencv" } });
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: /Salvar/i }));
    expect(mutateTags).toHaveBeenCalledWith({ radarItemId: "opencv-ai-competition-2026", tags: ["revisar", "opencv"] });
    fireEvent.click(screen.getByRole("button", { name: /Selecionar todos/i }));
    fireEvent.change(screen.getByRole("textbox", { name: /Tag para operação em lote/i }), { target: { value: "importante" } });
    fireEvent.click(screen.getByRole("button", { name: /Adicionar tag/i }));
    expect(mutateBatch).toHaveBeenCalledWith({ radarItemIds: ["opencv-ai-competition-2026"], tag: "importante", action: "add" });
  });
});
