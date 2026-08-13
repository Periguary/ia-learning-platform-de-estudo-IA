// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const navigate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/", navigate],
}));
vi.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({ theme: "dark", toggleTheme: vi.fn() }),
}));
vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: null, logout: vi.fn() }),
}));
vi.mock("@/const", () => ({
  getLoginUrl: () => "/login",
}));

describe("Navigation search", () => {
  it("abre a search bar destacada e navega para a Biblioteca com a consulta", async () => {
    const Navigation = (await import("./Navigation")).default;
    render(<Navigation />);

    fireEvent.click(screen.getByRole("button", { name: /Abrir busca de conteúdos/i }));
    const input = screen.getByRole("textbox", { name: /Buscar conteúdos de IA/i });
    fireEvent.change(input, { target: { value: "transformers" } });
    fireEvent.submit(input.closest("form")!);

    expect(navigate).toHaveBeenCalledWith("/library?query=transformers");
  });
});
