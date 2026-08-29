// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocalTutorPanel } from "./LocalTutorPanel";

vi.mock("@huggingface/transformers", () => ({
  pipeline: vi.fn(async () => async () => [{ generated_text: "Convolução aplica filtros aprendidos aos pixels." }]),
}));

describe("LocalTutorPanel", () => {
  it("gera uma resposta local sem depender do backend", async () => {
    render(<LocalTutorPanel courseTitle="Visão Computacional" lessonTitle="CNNs" lessonContent="Convolução e pooling" />);
    fireEvent.change(screen.getByLabelText(/Digite sua dúvida/i), { target: { value: "O que é convolução?" } });
    fireEvent.click(screen.getByRole("button", { name: /Perguntar ao Tutor Local/i }));
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("Convolução aplica"));
  });
});
