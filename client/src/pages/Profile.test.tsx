// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Profile from "./Profile";

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: { name: "Ada Lovelace" }, loading: false }),
}));

describe("Profile page", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("mostra o nome do aluno e o estado inicial de conquistas", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Medalhas do seu percurso/i })).toBeTruthy();
    expect(screen.getByText(/Seu histórico começará aqui/i)).toBeTruthy();
    expect(screen.getByText("0 min")).toBeTruthy();
    expect(screen.getByRole("progressbar", { name: /Progresso até Primeira Conquista/i })).toBeTruthy();
  });

  it("deriva uma certificação concluída e seu histórico do armazenamento local", () => {
    window.localStorage.setItem("ia-academy-interactive-certification-progress", JSON.stringify({
      "google-cloud-gen-ai": { "0": 1, "1": 1 },
    }));
    window.localStorage.setItem("ia-academy-interactive-certification-history", JSON.stringify({
      "google-cloud-gen-ai": { completedAt: "2026-08-17T12:00:00.000Z", correctCount: 2, scorePercentage: 100, attempts: 1 },
    }));

    render(<Profile />);
    expect(screen.getByText("Google Cloud Generative AI Professional")).toBeTruthy();
    expect(screen.getByText("100%")).toBeTruthy();
    expect(screen.getByText(/1 tentativa/)).toBeTruthy();
    expect(screen.getAllByText(/Aproveitamentos perfeitos/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Compartilhar no LinkedIn/i })).toBeTruthy();
  });

  it("permite editar nome e biografia e persiste as preferências locais", () => {
    render(<Profile />);
    fireEvent.click(screen.getAllByRole("button", { name: /Editar perfil/i }).at(-1)!);
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Ada IA" } });
    fireEvent.change(screen.getByLabelText("Biografia breve"), { target: { value: "Estudando agentes e sistemas generativos." } });
    fireEvent.click(screen.getByRole("button", { name: /Salvar perfil/i }));

    expect(screen.getByRole("heading", { name: "Ada IA" })).toBeTruthy();
    expect(screen.getByText("Estudando agentes e sistemas generativos.")).toBeTruthy();
    expect(JSON.parse(window.localStorage.getItem("ia-academy-profile-preferences") || "{}")).toMatchObject({ name: "Ada IA", bio: "Estudando agentes e sistemas generativos." });
  });
});
