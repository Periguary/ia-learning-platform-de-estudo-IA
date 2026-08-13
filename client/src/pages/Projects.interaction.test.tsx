/** @vitest-environment jsdom */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/projects", navigate],
}));

import Projects from "./Projects";

describe("Projects interaction", () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  it("navega do card de Previsão de Vendas para o detalhe do projeto", () => {
    render(<Projects />);

    const card = screen.getByRole("button", { name: /Previsão de Vendas/i });
    fireEvent.click(card);

    expect(navigate).toHaveBeenCalledWith("/project/1");
  });

  it("mantém um retorno funcional para a trilha", () => {
    render(<Projects />);

    const returnButtons = screen.getAllByRole("button", { name: /Voltar para Trilha/i });
    fireEvent.click(returnButtons[returnButtons.length - 1]);

    expect(navigate).toHaveBeenCalledWith("/learning-path");
  });
});
