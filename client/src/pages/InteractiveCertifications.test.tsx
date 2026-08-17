// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import InteractiveCertifications from "./InteractiveCertifications";

const navigate = vi.fn();
vi.mock("wouter", () => ({
  useLocation: () => ["/interactive-certifications", navigate],
}));

describe("InteractiveCertifications page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renderiza o componente de certificações interativas", () => {
    render(<InteractiveCertifications />);
    expect(screen.getByText(/Simuladores Oficiais de Certificações em IA/i)).toBeTruthy();
    expect(screen.getByLabelText("Filtrar por nível")).toBeTruthy();
    expect(screen.getByLabelText("Filtrar por provedor")).toBeTruthy();
  });

  it("filtra certificações por provedor e nível", () => {
    render(<InteractiveCertifications />);

    const catalog = within(screen.getAllByRole("complementary", { name: /Busca e filtros/i })[0]);
    fireEvent.change(catalog.getByLabelText("Filtrar por provedor"), { target: { value: "Hugging Face" } });
    expect(catalog.getByText("Hugging Face Certified Transformer Specialist")).toBeTruthy();
    expect(catalog.queryByText("Google Cloud Generative AI Professional")).toBeNull();

    fireEvent.change(catalog.getByLabelText("Filtrar por nível"), { target: { value: "Intermediário" } });
    expect(catalog.getByText(/Nenhuma certificação corresponde aos filtros atuais/i)).toBeTruthy();
  });

  it("registra progresso, conclui o simulado e oferece compartilhamento social", () => {
    render(<InteractiveCertifications />);

    fireEvent.click(screen.getAllByRole("button", { name: /Vertex AI/i }).at(-1)!);
    fireEvent.click(screen.getAllByRole("button", { name: /Próxima Questão/i }).at(-1)!);
    fireEvent.click(screen.getAllByRole("button", { name: /Retrieval-Augmented Generation/i }).at(-1)!);
    fireEvent.click(screen.getAllByRole("button", { name: /Ver Resultado/i }).at(-1)!);

    expect(screen.getByText(/Simulado Concluído!/i)).toBeTruthy();
    expect(screen.getAllByText(/100%/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /X\/Twitter/i })).toBeTruthy();
    expect(screen.getAllByText(/Primeira Conquista/i).length).toBeGreaterThan(0);
  });
});
