// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { createPublicProfileToken } from "@/data/profile";
import PublicProfile from "./PublicProfile";

describe("PublicProfile page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/profile/public");
  });

  it("renderiza somente o portfólio e as conquistas contidas no link", () => {
    const token = createPublicProfileToken({
      name: "Ada IA",
      bio: "Construindo aplicações generativas.",
      badges: ["Primeira Conquista"],
      certifications: [{ title: "Certificação em IA", issuer: "IA Academy", score: 92, completedAt: "2026-08-17T12:00:00.000Z" }],
    });
    window.history.replaceState({}, "", `/profile/public?token=${token}`);

    render(<PublicProfile />);

    expect(screen.getByRole("heading", { name: "Ada IA" })).toBeTruthy();
    expect(screen.getByText("Construindo aplicações generativas.")).toBeTruthy();
    expect(screen.getByText("Primeira Conquista")).toBeTruthy();
    expect(screen.getByText("92%" )).toBeTruthy();
    expect(screen.queryByText(/email/i)).toBeNull();
  });

  it("mostra estado seguro para token ausente ou inválido", () => {
    render(<PublicProfile />);
    expect(screen.getByRole("heading", { name: /Perfil público indisponível/i })).toBeTruthy();
  });
});
