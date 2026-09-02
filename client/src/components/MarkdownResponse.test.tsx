/** @vitest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("streamdown", () => ({
  Streamdown: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="streamdown-content">{children}</div>
  ),
}));

import { MarkdownResponse } from "./MarkdownResponse";

describe("MarkdownResponse", () => {
  it("encaminha Markdown completo ao renderer e aplica a classe de leitura", () => {
    const content = "## Exemplo\\n\\n```python\\nprint('Olá')\\n```\\n\\n- conceito";

    render(<MarkdownResponse content={content} />);

    expect(screen.getByTestId("streamdown-content").textContent).toBe(content);
    expect(screen.getByTestId("streamdown-content").parentElement?.classList.contains("ai-markdown")).toBe(true);
  });
});
