// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShareActions } from "./ShareActions";

describe("ShareActions", () => {
  it("abre opções de compartilhamento para redes e cópia de link", () => {
    render(<ShareActions title="Teste IA" text="Aprenda IA" url="https://example.com/ia" />);

    fireEvent.click(screen.getByRole("button", { name: /Compartilhar Teste IA/i }));

    expect(screen.getByRole("button", { name: /Copiar link/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /WhatsApp/i }).getAttribute("href")).toContain("wa.me");
    expect(screen.getByRole("link", { name: /LinkedIn/i }).getAttribute("href")).toContain("linkedin.com");
    expect(screen.queryByRole("link", { name: /Google/i })).toBeNull();
  });
});
