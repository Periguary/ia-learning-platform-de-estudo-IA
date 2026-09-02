import React from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

type MarkdownResponseProps = {
  content: string;
  className?: string;
};

/**
 * Renderiza conteúdo gerado pelo Tutor com Markdown, incluindo código, listas,
 * links e fórmulas, usando o pipeline seguro padrão do Streamdown.
 */
export function MarkdownResponse({ content, className }: MarkdownResponseProps) {
  return (
    <div className={cn("ai-markdown prose prose-sm dark:prose-invert max-w-none", className)}>
      <Streamdown
        controls={{ code: true, mermaid: true, table: true }}
        shikiTheme={["github-light", "github-dark"]}
        mermaidConfig={{ securityLevel: "strict", startOnLoad: false }}
      >
        {content}
      </Streamdown>
    </div>
  );
}
