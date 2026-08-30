// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CodePlayground } from "./CodePlayground";

describe("CodePlayground", () => {
  it("executa código Python local quando o runtime está disponível", async () => {
    window.loadPyodide = vi.fn(async () => ({ runPythonAsync: async () => "ok" }));
    render(<CodePlayground examples={[{ label: "Python", language: "python", code: "print('ok')" }]} />);
    fireEvent.click(screen.getByRole("button", { name: /Executar no Navegador/i }));
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain("ok"));
  });

  it("envia o trecho selecionado para o Tutor Local", () => {
    const onExplainSelection = vi.fn();
    render(<CodePlayground onExplainSelection={onExplainSelection} examples={[{ label: "OpenCV", language: "python", code: "import cv2\nimg = cv2.imread('foto.png')" }]} />);
    const editor = screen.getByRole("textbox", { name: /Código OpenCV/i }) as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, 10);
    fireEvent.select(editor);
    fireEvent.click(screen.getByRole("button", { name: /Explicar seleção/i }));
    expect(onExplainSelection).toHaveBeenCalledWith("import cv2");
  });

  it("permite alternar exemplos e editar o código", () => {
    render(<CodePlayground examples={[{ label: "OpenCV", language: "python", code: "import cv2" }, { label: "PyTorch", language: "python", code: "import torch" }]} />);
    expect(screen.getByDisplayValue("import cv2")).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "PyTorch" }));
    const editor = screen.getByRole("textbox", { name: /Código PyTorch/i });
    fireEvent.change(editor, { target: { value: "import torch\nprint(1)" } });
    expect(screen.getByDisplayValue(/print\(1\)/)).toBeTruthy();
  });
});
