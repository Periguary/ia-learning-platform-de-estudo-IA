// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CodePlayground } from "./CodePlayground";

describe("CodePlayground", () => {
  beforeEach(() => {
    delete window.__iaAcademyPyodide;
  });

  afterEach(() => {
    cleanup();
    delete window.__iaAcademyPyodide;
  });

  it("oferece Baixar tudo e cria um arquivo Markdown com os snippets", () => {
    const createObjectURL = vi.fn().mockReturnValue("blob:test");
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: revokeObjectURL });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);
    render(<CodePlayground moduleTitle="Visão Computacional" lessonTitle="OpenCV" examples={[{ label: "Python", language: "python", code: "print('ok')" }, { label: "SQL", language: "sql", code: "select 1;" }]} />);

    fireEvent.click(screen.getByRole("button", { name: /Baixar tudo/i }));

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:test");
    click.mockRestore();
  });

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
