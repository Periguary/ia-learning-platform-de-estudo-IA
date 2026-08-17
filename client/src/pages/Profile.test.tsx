// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
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
  });
});
