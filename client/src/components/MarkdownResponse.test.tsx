/** @vitest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
      {children}
    </div>
  ),
}));

import { MarkdownResponse } from "./MarkdownResponse";

describe("MarkdownResponse", () => {
  it("encaminha Markdown completo ao renderer e aplica a classe de leitura", () => {
    const content = "## Exemplo\\n\\n```python\\nprint('Olá')\\n```\\n\\n- conceito";

    render(<MarkdownResponse content={content} />);

    expect(screen.getByTestId("streamdown-content").textContent).toBe(content);
    const renderer = screen.getByTestId("streamdown-content");
    expect(renderer.parentElement?.classList.contains("ai-markdown")).toBe(true);
    expect(renderer.dataset.controls).toBe(JSON.stringify({ code: true, mermaid: true, table: true }));
    expect(renderer.dataset.shikiTheme).toBe(JSON.stringify(["github-light", "github-dark"]));
    expect(renderer.dataset.mermaidConfig).toBe(JSON.stringify({ securityLevel: "strict", startOnLoad: false }));
  });
});
