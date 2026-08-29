// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CodePlayground } from "./CodePlayground";

describe("CodePlayground", () => {
  it("permite alternar exemplos e editar o código", () => {
    render(<CodePlayground examples={[{ label: "OpenCV", language: "python", code: "import cv2" }, { label: "PyTorch", language: "python", code: "import torch" }]} />);
    expect(screen.getByDisplayValue("import cv2")).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "PyTorch" }));
    const editor = screen.getByRole("textbox", { name: /Código PyTorch/i });
    fireEvent.change(editor, { target: { value: "import torch\nprint(1)" } });
    expect(screen.getByDisplayValue(/print\(1\)/)).toBeTruthy();
  });
});
