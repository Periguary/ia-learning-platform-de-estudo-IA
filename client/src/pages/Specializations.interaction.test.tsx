// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const navigate = vi.fn();
vi.mock("wouter", () => ({ useLocation: () => ["/specializations", navigate] }));

import Specializations from "./Specializations";

describe("Specializations interactions", () => {
  it("filtra por ferramenta e mantém a área correspondente visível", () => {
    render(<Specializations />);
    const search = screen.getByRole("searchbox", { name: /Buscar especializações/i });
    fireEvent.change(search, { target: { value: "OpenCV" } });

    expect(screen.getByRole("heading", { name: /Visão Computacional/i })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /IA no Frontend/i })).toBeNull();
  });

  it("filtra por dificuldade e stack tecnológica", async () => {
    render(<Specializations />);
    fireEvent.change(screen.getAllByRole("combobox", { name: /dificuldade/i })[0], { target: { value: "Avançado" } });
    fireEvent.change(screen.getAllByRole("combobox", { name: /stack tecnológica/i })[0], { target: { value: "OpenCV" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: /Visão Computacional/i })).toBeTruthy());
    expect(screen.getAllByRole("heading", { name: /Visão Computacional/i }).length).toBeGreaterThan(0);
  });

  it("filtra por área e permite abrir o módulo recomendado", () => {
    render(<Specializations />);
    fireEvent.change(screen.getAllByRole("combobox", { name: /Filtrar especializações/i })[0], { target: { value: "Vision & Imaging" } });

    expect(screen.getByRole("heading", { name: /Visão Computacional/i })).toBeTruthy();
    fireEvent.click(screen.getAllByRole("button", { name: /Estudar Módulo Relacionado/i })[0]);
    expect(navigate).toHaveBeenCalledWith("/course/6/computer-vision");
  });
});
