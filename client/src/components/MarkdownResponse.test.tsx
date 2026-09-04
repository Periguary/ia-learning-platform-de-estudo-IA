/** @vitest-environment jsdom */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("streamdown", () => ({
  Streamdown: ({
    children,
    controls,
    shikiTheme,
    mermaidConfig,
  }: {
    children: React.ReactNode;
    controls?: unknown;
    shikiTheme?: unknown;
    mermaidConfig?: unknown;
  }) => (
    <div
      data-testid="streamdown-content"
      data-controls={JSON.stringify(controls)}
      data-shiki-theme={JSON.stringify(shikiTheme)}
      data-mermaid-config={JSON.stringify(mermaidConfig)}
    >
      <button type="button" title="Copy code">Copy</button>
      {children}
    </div>
  ),
}));

import { MarkdownResponse } from "./MarkdownResponse";

describe("MarkdownResponse", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("encaminha Markdown completo ao renderer e aplica a classe de leitura", () => {
    const content = "## Exemplo\\n\\n```python\\nprint('Olá')\\n```\\n\\n- conceito";

    render(<MarkdownResponse content={content} />);

    expect(screen.getByTestId("streamdown-content").lastChild?.textContent).toBe(content);
    const renderer = screen.getByTestId("streamdown-content");
    expect(renderer.parentElement?.classList.contains("ai-markdown")).toBe(true);
    expect(renderer.dataset.controls).toBe(JSON.stringify({ code: true, mermaid: true, table: true }));
    expect(renderer.dataset.shikiTheme).toBe(JSON.stringify(["github-light", "github-dark"]));
    expect(renderer.dataset.mermaidConfig).toBe(JSON.stringify({ securityLevel: "strict", startOnLoad: false }));
  });

  it("exibe e remove o feedback de cópia após 2,5 segundos", () => {
    vi.useFakeTimers();
    render(<MarkdownResponse content="```python\\nprint('Olá')\\n```" />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("status").textContent).toBe("Copiado!");

    act(() => {
      vi.advanceTimersByTime(2_500);
    });
    expect(screen.queryByRole("status")).toBeNull();
  });
});
