import React, { useEffect, useRef, useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const feedbackTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (feedbackTimer.current !== undefined) window.clearTimeout(feedbackTimer.current);
  }, []);

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest('button[title^="Copy"]')) return;
    setCopied(true);
    if (feedbackTimer.current !== undefined) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setCopied(false), 2_500);
  };

  return (
    <div onClickCapture={handleClickCapture} className={cn("ai-markdown relative prose prose-sm dark:prose-invert max-w-none", className)}>
      {copied && <span role="status" aria-live="polite" className="pointer-events-none absolute right-0 top-0 rounded-md border border-lime-400/35 bg-lime-400/10 px-2 py-1 text-xs font-semibold text-lime-200">Copiado!</span>}
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
