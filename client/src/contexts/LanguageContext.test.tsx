// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const updateLanguage = vi.hoisted(() => vi.fn());

vi.mock("@/lib/trpc", () => ({
  trpc: {
    auth: {
      me: { useQuery: () => ({ data: { id: 7, language: "pt-BR" } }) },
      updateLanguage: { useMutation: () => ({ mutate: updateLanguage }) },
    },
  },
}));

function LanguageProbe() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <output aria-label="idioma atual">{language}</output>
      <button type="button" onClick={() => setLanguage("en")}>{t("nav.login")}</button>
    </div>
  );
}

describe("LanguageContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "pt-BR";
  });

  afterEach(() => cleanup());

  it("começa em PT-BR e persiste a troca para English", () => {
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    expect(screen.getByLabelText("idioma atual").textContent).toBe("pt-BR");
    expect(screen.getByRole("button", { name: "Entrar" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByLabelText("idioma atual").textContent).toBe("en");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
    expect(window.localStorage.getItem("ia-academy-language")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(updateLanguage).toHaveBeenCalledWith({ language: "en" });
  });

  it("lê a preferência persistida ao iniciar", () => {
    window.localStorage.setItem("ia-academy-language", "en");
    render(<LanguageProvider><LanguageProbe /></LanguageProvider>);
    expect(screen.getByLabelText("idioma atual").textContent).toBe("en");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
  });
});
