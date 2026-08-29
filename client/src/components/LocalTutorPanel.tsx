import React, { useState } from "react";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocalTutorPanelProps = {
  courseTitle: string;
  lessonTitle?: string;
  lessonContent?: string;
  studentNotes?: string;
};

type GeneratedText = { generated_text?: string };
type Generator = (prompt: string, options: Record<string, unknown>) => Promise<GeneratedText[]>;

const MODEL_ID = "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA";

let generatorPromise: Promise<Generator> | null = null;

async function getGenerator(): Promise<Generator> {
  if (!generatorPromise) {
    generatorPromise = import("@huggingface/transformers").then(async ({ pipeline }) => {
      const pipe = await pipeline("text-generation", MODEL_ID, {
        device: "wasm",
        dtype: "q4",
      });
      return pipe as unknown as Generator;
    });
  }
  return generatorPromise;
}

function buildPrompt({ courseTitle, lessonTitle, lessonContent, studentNotes, question }: LocalTutorPanelProps & { question: string }) {
  const context = [
    `Curso: ${courseTitle}`,
    lessonTitle ? `Aula: ${lessonTitle}` : "",
    lessonContent ? `Conteúdo autorizado: ${lessonContent.slice(0, 1800)}` : "",
    studentNotes ? `Notas do estudante: ${studentNotes.slice(0, 900)}` : "",
  ].filter(Boolean).join("\n");
  return `<|im_start|>system\nVocê é um tutor local de IA. Responda em português brasileiro, com uma explicação curta, correta e didática. Use apenas o contexto fornecido. Se o contexto não bastar, diga que é necessário revisar a aula. Não invente fontes ou fatos.\n<|im_end|>\n<|im_start|>user\n${context}\n\nDúvida: ${question.slice(0, 600)}\n<|im_end|>\n<|im_start|>assistant\n`;
}

export function LocalTutorPanel(props: LocalTutorPanelProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askLocally = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const generator = await getGenerator();
      const result = await generator(buildPrompt({ ...props, question }), {
        max_new_tokens: 180,
        temperature: 0.2,
        do_sample: false,
        return_full_text: false,
      });
      setAnswer(result[0]?.generated_text?.trim() || "O modelo local não retornou uma resposta. Tente reformular a dúvida.");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Falha desconhecida";
      setError(`Não foi possível executar o modelo local agora: ${message}. Você pode voltar ao modo Nuvem ou usar os exemplos no Colab.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-none border-0 bg-background/30 p-5" aria-label="Tutor Local WebAssembly">
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden="true" />
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><Sparkles className="size-4" /> Tutor Local gratuito</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Inferência no próprio navegador via ONNX/WebAssembly. O texto não é enviado ao servidor. Na primeira pergunta, o modelo quantizado é baixado e armazenado em cache pelo navegador.</p>
        </div>
      </div>
      <label className="block text-sm font-medium text-foreground" htmlFor="local-tutor-question">Digite sua dúvida</label>
      <textarea id="local-tutor-question" value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ex.: Qual a diferença entre convolução e pooling?" className="min-h-28 w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void askLocally()} disabled={loading || !question.trim()} className="gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {loading ? "Carregando modelo..." : "Perguntar ao Tutor Local"}
        </Button>
        <span className="text-xs text-muted-foreground">Modelo: SmolLM2 135M • ONNX • Apache-2.0</span>
      </div>
      {answer && <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm leading-6 text-foreground" role="status"><strong className="mb-2 block text-emerald-200">Resposta local</strong>{answer}</div>}
      {error && <p className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-xs leading-5 text-amber-100" role="alert">{error}</p>}
    </div>
  );
}
