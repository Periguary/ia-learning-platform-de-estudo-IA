// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AIGlossary } from "./AIGlossary";

describe("AIGlossary", () => {
  it("abre, busca um termo e mostra explicação prática", () => {
    render(<AIGlossary />);
    fireEvent.click(screen.getByRole("button", { name: /Abrir glossário de IA/i }));
    expect(screen.getByRole("dialog", { name: /Glossário de termos avançados/i })).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox", { name: /Buscar termo no glossário/i }), { target: { value: "RAG" } });
    fireEvent.click(screen.getByRole("button", { name: /^RAG/ }));
    expect(screen.getByText(/Retrieval-Augmented Generation/i)).toBeTruthy();
    expect(screen.getByText(/Na prática:/i)).toBeTruthy();
  });
});
