// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Profile from "./Profile";
import { ThemeProvider } from "@/contexts/ThemeContext";

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: { name: "Ada Lovelace" }, loading: false }),
}));

describe("Profile page", () => {
  const renderProfile = () => render(<ThemeProvider defaultTheme="dark" switchable><Profile /></ThemeProvider>);

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("mostra o nome do aluno e o estado inicial de conquistas", () => {
    renderProfile();
    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Medalhas do seu percurso/i })).toBeTruthy();
    expect(screen.getByText("ACHIEVEMENT GRID // LIVE")).toBeTruthy();
    expect(screen.getByText("0/3 desbloqueadas")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Exportar imagem/i })).toBeTruthy();
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

    renderProfile();
    expect(screen.getByText("Google Cloud Generative AI Professional")).toBeTruthy();
    expect(screen.getByText("100%")).toBeTruthy();
    expect(screen.getByText(/1 tentativa/)).toBeTruthy();
    expect(screen.getAllByText(/Aproveitamentos perfeitos/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Compartilhar no LinkedIn/i })).toBeTruthy();
  });

  it("exibe atividade semanal e sequência com dados registrados", () => {
    const today = new Date().toISOString().slice(0, 10);
    window.localStorage.setItem("ia-academy-study-activity", JSON.stringify({ [today]: { completedLessons: 3, certificationAttempts: 1 } }));
    renderProfile();
    expect(screen.getByText("1 dias consecutivos")).toBeTruthy();
    expect(screen.getByText(/4 ações registradas/i)).toBeTruthy();
    expect(screen.getAllByLabelText("Gráfico de atividade semanal").length).toBeGreaterThan(0);
  });

  it("gera um link público e oferece controles de corte do avatar", async () => {
    window.localStorage.setItem("ia-academy-profile-preferences", JSON.stringify({ avatarDataUrl: "data:image/png;base64,AAAA" }));
    renderProfile();
    fireEvent.click(screen.getAllByRole("button", { name: /Criar link público/i }).at(-1)!);
    expect(window.localStorage.getItem("ia-academy-profile-preferences")).toContain("publicEnabled");
    expect((await screen.findByRole("status")).textContent).toMatch(/Link público copiado/i);
    fireEvent.click(screen.getAllByRole("button", { name: /Editar perfil/i }).at(-1)!);
    expect(screen.getByLabelText("Ajustar zoom do avatar")).toBeTruthy();
    expect(screen.getByLabelText("Ajustar posição horizontal do avatar")).toBeTruthy();
    expect(screen.getByLabelText("Ajustar posição vertical do avatar")).toBeTruthy();
  });

  it("aplica o modo de alto contraste neon salvo nas preferências", () => {
    window.localStorage.setItem("ia-academy-profile-preferences", JSON.stringify({ highContrastNeon: true }));
    renderProfile();
    expect(document.documentElement.classList.contains("neon-high-contrast")).toBe(true);
  });

  it("permite editar nome e biografia e persiste as preferências locais", async () => {
    renderProfile();
    fireEvent.click(screen.getAllByRole("button", { name: /Editar perfil/i }).at(-1)!);
    fireEvent.change(screen.getAllByLabelText("Nome").at(-1)!, { target: { value: "Ada IA" } });
    fireEvent.change(screen.getAllByLabelText("Biografia breve").at(-1)!, { target: { value: "Estudando agentes e sistemas generativos." } });
    fireEvent.click(screen.getAllByLabelText("Ativar efeitos sonoros").at(-1)!);
    fireEvent.change(screen.getAllByLabelText("Volume dos efeitos sonoros").at(-1)!, { target: { value: "0.6" } });
    fireEvent.click(screen.getAllByRole("button", { name: /Salvar perfil/i }).at(-1)!);

    expect(await screen.findByRole("heading", { name: "Ada IA" })).toBeTruthy();
    expect(screen.getByText("Estudando agentes e sistemas generativos.")).toBeTruthy();
    expect(JSON.parse(window.localStorage.getItem("ia-academy-profile-preferences") || "{}")).toMatchObject({ name: "Ada IA", bio: "Estudando agentes e sistemas generativos.", soundEnabled: true, soundVolume: 0.6 });
  });
});
