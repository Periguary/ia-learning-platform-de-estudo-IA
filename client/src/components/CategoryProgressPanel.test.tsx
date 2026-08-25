// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryProgressPanel from "./CategoryProgressPanel";

describe("CategoryProgressPanel", () => {
  it("mostra percentuais, aulas e estados reais por categoria", () => {
    render(<CategoryProgressPanel categories={[
      { id: 1, title: "Fundamentos Matemáticos", completed: 3, total: 3, percentage: 100 },
      { id: 5, title: "Machine Learning", completed: 2, total: 8, percentage: 25 },
    ]} />);

    expect(screen.getByRole("heading", { name: /Estatísticas por categoria de IA/i })).toBeTruthy();
    expect(screen.getByLabelText(/Fundamentos Matemáticos: 100% concluído/i)).toBeTruthy();
    expect(screen.getByText("CONCLUÍDA")).toBeTruthy();
    expect(screen.getByText("2/8 aulas")).toBeTruthy();
    expect(screen.getByText("EM PROGRESSO")).toBeTruthy();
  });
});
