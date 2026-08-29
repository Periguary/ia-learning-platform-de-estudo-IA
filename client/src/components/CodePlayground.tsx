import React from "react";
import { Check, Clipboard, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type CodeExample = {
  label: string;
  language: string;
  code: string;
};

type CodePlaygroundProps = {
  examples: CodeExample[];
};

type PyodideInstance = {
  runPythonAsync: (code: string) => Promise<unknown>;
};

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideInstance>;
    __iaAcademyPyodide?: Promise<PyodideInstance>;
  }
}

function loadPyodideRuntime(): Promise<PyodideInstance> {
  if (window.__iaAcademyPyodide) return window.__iaAcademyPyodide;
  window.__iaAcademyPyodide = new Promise((resolve, reject) => {
    const start = () => window.loadPyodide
      ? window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" }).then(resolve, reject)
      : reject(new Error("Runtime Pyodide indisponível."));
    if (window.loadPyodide) return start();
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
    script.async = true;
    script.onload = start;
    script.onerror = () => reject(new Error("Não foi possível carregar o Pyodide. Verifique sua conexão."));
    document.head.appendChild(script);
  });
  return window.__iaAcademyPyodide;
}

export function CodePlayground({ examples }: CodePlaygroundProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const active = examples[activeIndex];
  if (!active) return null;
  const code = drafts[activeIndex] ?? active.code;

  const runCode = async () => {
    setRunning(true);
    setOutput("Carregando o runtime Python no navegador...");
    try {
      const pyodide = await loadPyodideRuntime();
      const result = await pyodide.runPythonAsync(code);
      setOutput(result == null ? "Execução concluída sem valor de retorno." : String(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const dependencyHint = /No module named ['\"]?(cv2|torch|torchvision)/i.test(message)
        ? " O Pyodide executa Python localmente, mas este navegador não possui essa biblioteca nativa instalada. Use o botão Abrir no Colab para executar OpenCV/PyTorch completos."
        : "";
      setOutput(`Execução interrompida: ${message}.${dependencyHint}`);
    } finally {
      setRunning(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl border border-cyan-500/25 bg-slate-950/80 p-4 shadow-inner" aria-label="Playground de código">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Playground prático</p>
          <p className="mt-1 text-sm text-slate-300">Edite o exemplo, copie para o Colab e experimente com seus próprios dados.</p>
        </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => void runCode()} disabled={running} className="gap-1.5 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
              {running ? "Executando..." : "Executar no Navegador"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => window.open("https://colab.research.google.com/", "_blank", "noopener,noreferrer")} className="gap-1.5 border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/10">
              <ExternalLink className="size-3.5" /> Abrir no Colab
            </Button>
          </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Exemplos de código">
        {examples.map((example, index) => (
          <button key={`${example.label}-${index}`} type="button" role="tab" aria-selected={index === activeIndex} onClick={() => setActiveIndex(index)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${index === activeIndex ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
            {example.label}
          </button>
        ))}
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-700 px-3 py-2">
          <span className="text-xs font-mono text-slate-400">{active.language}</span>
          <Button type="button" variant="ghost" size="sm" onClick={() => void copyCode()} className="h-7 gap-1.5 text-xs text-slate-300 hover:text-white">
            {copied ? <Check className="size-3.5 text-emerald-300" /> : <Clipboard className="size-3.5" />}
            {copied ? "Copiado" : "Copiar código"}
          </Button>
        </div>
        <textarea aria-label={`Código ${active.label}`} value={code} onChange={event => setDrafts(current => ({ ...current, [activeIndex]: event.target.value }))} spellCheck={false} className="min-h-56 w-full resize-y bg-transparent p-4 font-mono text-xs leading-6 text-cyan-50 outline-none focus:ring-2 focus:ring-cyan-400/50" />
      </div>
      {output && <pre role="status" className="mt-3 whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs leading-5 text-emerald-200">{output}</pre>}
    </section>
  );
}
