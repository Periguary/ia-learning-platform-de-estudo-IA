import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Database, Download, HardDrive, Loader2, Pause, Play, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocalTutorPanelProps = { courseTitle: string; lessonTitle?: string; lessonContent?: string; studentNotes?: string; selectedCode?: string };
type GeneratedText = { generated_text?: string };
type Generator = (prompt: string, options: Record<string, unknown>) => Promise<GeneratedText[]>;
type DownloadProgress = { status?: string; file?: string; progress?: number; loaded?: number; total?: number; startedAt?: number };
type ModelOption = { id: string; label: string; language: string; license: string };
type StorageSummary = { usage?: number; quota?: number };
type FileLedger = Record<string, { loaded: number; total?: number }>;

const MODEL_OPTIONS: ModelOption[] = [
  { id: "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA", label: "Rápido · SmolLM2 135M", language: "inglês (rápido para protótipos)", license: "Apache-2.0" },
  { id: "onnx-community/granite-4.0-1b-ONNX-web", label: "Português · Granite 4.0 1B", language: "multilíngue, incluindo português", license: "Apache-2.0" },
];
const generatorPromises = new Map<string, Promise<Generator>>();
const controls = new Map<string, { paused: boolean }>();
const cacheKey = (modelId: string) => `ia-academy-local-model:${modelId}:ready`;
const ledgerKey = (modelId: string) => `ia-academy-local-model:${modelId}:files`;
const formatBytes = (bytes?: number) => { if (bytes === undefined || !Number.isFinite(bytes)) return "não mensurado"; const units = ["B", "KB", "MB", "GB"]; let value = Math.max(0, bytes); let index = 0; while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; } return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`; };
const formatEta = (seconds?: number) => { if (!seconds || !Number.isFinite(seconds) || seconds < 0) return "calculando…"; if (seconds < 60) return `${Math.ceil(seconds)}s`; return `${Math.floor(seconds / 60)}min ${Math.ceil(seconds % 60)}s`; };
const readLedger = (modelId: string): FileLedger => { try { return JSON.parse(localStorage.getItem(ledgerKey(modelId)) || "{}"); } catch { return {}; } };
const ledgerBytes = (modelId: string) => Object.values(readLedger(modelId)).reduce((sum, file) => sum + (file.loaded || 0), 0);
const ledgerTotal = (modelId: string) => Object.values(readLedger(modelId)).reduce((sum, file) => sum + (file.total || 0), 0) || undefined;
const saveProgressToLedger = (modelId: string, info: DownloadProgress) => { if (!info.file || info.loaded === undefined) return; const ledger = readLedger(modelId); ledger[info.file] = { loaded: info.loaded, total: info.total }; localStorage.setItem(ledgerKey(modelId), JSON.stringify(ledger)); };

const waitForResume = async (control: { paused: boolean }) => { while (control.paused) await new Promise(resolve => setTimeout(resolve, 120)); };
const pausableFetch = (control: { paused: boolean }) => async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await window.fetch(input, init);
  if (!response.body) return response;
  const reader = response.body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) { await waitForResume(control); try { const chunk = await reader.read(); if (chunk.done) controller.close(); else controller.enqueue(chunk.value); } catch (error) { controller.error(error); } },
    cancel(reason) { return reader.cancel(reason); },
  });
  return new Response(stream, { status: response.status, statusText: response.statusText, headers: response.headers });
};

async function getGenerator(modelId: string, onProgress: (progress: DownloadProgress) => void, control: { paused: boolean }) {
  const existing = generatorPromises.get(modelId); if (existing) return existing;
  const promise = import("@huggingface/transformers").then(async ({ pipeline }) => {
    const originalFetch = window.fetch;
    window.fetch = pausableFetch(control) as typeof window.fetch;
    try {
      const pipe = await pipeline("text-generation", modelId, { device: "wasm", dtype: "q4", progress_callback: (info: DownloadProgress) => { saveProgressToLedger(modelId, info); onProgress(info); } });
      localStorage.setItem(cacheKey(modelId), "1"); onProgress({ status: "ready", progress: 100 }); return pipe as unknown as Generator;
    } finally { window.fetch = originalFetch; }
  });
  generatorPromises.set(modelId, promise); try { return await promise; } catch (error) { generatorPromises.delete(modelId); throw error; }
}

async function removeModelCache(modelId: string) {
  generatorPromises.delete(modelId); controls.delete(modelId); localStorage.removeItem(cacheKey(modelId)); localStorage.removeItem(ledgerKey(modelId));
  if (typeof caches !== "undefined") { const names = await caches.keys(); await Promise.all(names.filter(name => /transformers|huggingface|onnx/i.test(name)).map(name => caches.delete(name))); }
  if ("databases" in indexedDB) { const databases = await indexedDB.databases(); await Promise.all(databases.filter(database => database.name && /transformers|huggingface|onnx/i.test(database.name)).map(database => new Promise<void>(resolve => { const request = indexedDB.deleteDatabase(database.name!); request.onsuccess = request.onerror = request.onblocked = () => resolve(); }))); }
}
const buildPrompt = ({ courseTitle, lessonTitle, lessonContent, studentNotes, selectedCode, question }: LocalTutorPanelProps & { question: string }) => [`Curso: ${courseTitle}`, lessonTitle ? `Aula: ${lessonTitle}` : "", lessonContent ? `Conteúdo autorizado: ${lessonContent.slice(0, 1800)}` : "", studentNotes ? `Notas do estudante: ${studentNotes.slice(0, 900)}` : "", selectedCode ? `Trecho de código selecionado pelo estudante:\n${selectedCode.slice(0, 1600)}` : "", `Dúvida: ${question.slice(0, 600)}`].filter(Boolean).join("\n\n");

export function LocalTutorPanel(props: LocalTutorPanelProps) {
  const [modelId, setModelId] = useState(MODEL_OPTIONS[1].id); const [question, setQuestion] = useState(""); const [answer, setAnswer] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [progress, setProgress] = useState<DownloadProgress>({}); const [isCached, setIsCached] = useState(false); const [paused, setPaused] = useState(false); const [storage, setStorage] = useState<StorageSummary>({}); const [modelBytes, setModelBytes] = useState<number>();
  const model = useMemo(() => MODEL_OPTIONS.find(option => option.id === modelId) ?? MODEL_OPTIONS[1], [modelId]); const control = controls.get(modelId) ?? { paused: false }; controls.set(modelId, control);
  const loaded = progress.loaded; const total = progress.total; const percent = Math.max(0, Math.min(100, progress.progress ?? (loaded && total ? (loaded / total) * 100 : 0))); const eta = loaded && total && progress.startedAt ? formatEta(((Date.now() - progress.startedAt) / 1000) * (total - loaded) / loaded) : undefined; const modelTotal = ledgerTotal(modelId);
  useEffect(() => { setProgress({}); setAnswer(""); setError(""); setPaused(false); control.paused = false; setIsCached(typeof window !== "undefined" && localStorage.getItem(cacheKey(modelId)) === "1"); setModelBytes(ledgerBytes(modelId)); }, [modelId]);
  useEffect(() => { let cancelled = false; const updateStorage = async () => { if (!navigator.storage?.estimate) return; const estimate = await navigator.storage.estimate(); if (!cancelled) setStorage({ usage: estimate.usage, quota: estimate.quota }); }; void updateStorage(); const interval = window.setInterval(() => void updateStorage(), 2000); return () => { cancelled = true; window.clearInterval(interval); }; }, [modelId, isCached, progress.loaded]);
  const askLocally = async () => { if (!question.trim()) return; setLoading(true); setError(""); setAnswer(""); const startedAt = Date.now(); setProgress({ status: "initiate", startedAt }); try { const generator = await getGenerator(modelId, info => { setProgress(previous => ({ ...previous, ...info, startedAt })); if (info.status === "ready") { setIsCached(true); setModelBytes(ledgerBytes(modelId)); } }, control); setIsCached(true); setModelBytes(ledgerBytes(modelId)); const result = await generator(buildPrompt({ ...props, question }), { max_new_tokens: 180, temperature: 0.2, do_sample: false, return_full_text: false }); setAnswer(result[0]?.generated_text?.trim() || "O modelo local não retornou uma resposta. Tente reformular a dúvida."); } catch (caught) { const message = caught instanceof Error ? caught.message : "Falha desconhecida"; setError(`Não foi possível executar o modelo local agora: ${message}. Você pode voltar ao modo Nuvem ou usar os exemplos no Colab.`); } finally { setLoading(false); setPaused(false); control.paused = false; } };
  const togglePause = () => { control.paused = !control.paused; setPaused(control.paused); };
  const deleteCache = async () => { setLoading(true); setError(""); try { await removeModelCache(modelId); setProgress({}); setAnswer(""); setIsCached(false); setModelBytes(undefined); setStorage({}); } catch { setError("O navegador não permitiu remover todos os dados automaticamente. Verifique as configurações de armazenamento do site."); } finally { setLoading(false); } };
  const storagePercent = storage.quota && storage.usage ? Math.min(100, (storage.usage / storage.quota) * 100) : 0;
  return <div className="space-y-4 rounded-none border-0 bg-background/30 p-5" aria-label="Tutor Local WebAssembly">
    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden="true" /><div className="min-w-0 flex-1"><p className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><Sparkles className="size-4" /> Tutor Local gratuito e open source</p><p className="mt-1 text-xs leading-5 text-muted-foreground">A inferência acontece no próprio navegador via ONNX/WebAssembly. Suas notas, perguntas e código selecionado não são enviados ao servidor.</p></div></div>
    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"><div><label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="local-model">Modelo local</label><select id="local-model" value={modelId} onChange={event => setModelId(event.target.value)} className="w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20">{MODEL_OPTIONS.map(option => <option key={option.id} value={option.id}>{option.label} · {option.language}</option>)}</select></div><div className="flex items-center gap-2 text-xs text-muted-foreground" aria-live="polite">{isCached ? <><CheckCircle2 className="size-4 text-emerald-300" /> Modelo em cache</> : <><Download className="size-4" /> Modelo ainda não baixado</>}</div></div>
    {(loading || progress.status === "progress" || progress.status === "initiate") && <div className="space-y-3 rounded-xl border border-border bg-card p-3" aria-label="Progresso do download do modelo"><div className="flex justify-between gap-3 text-xs"><span>{progress.status === "initiate" ? "Preparando download…" : paused ? "Download pausado — progresso preservado" : "Baixando modelo quantizado…"}</span><span>{percent ? `${percent.toFixed(0)}%` : "calculando…"}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-400 transition-[width] duration-200" style={{ width: `${percent}%` }} /></div><div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground"><span>{formatBytes(loaded)} / {formatBytes(total || modelTotal)} · dados do arquivo</span><span>Tempo restante: {eta}</span></div><Button type="button" variant="outline" size="sm" onClick={togglePause} className="gap-2" disabled={progress.status === "initiate"}>{paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}{paused ? "Retomar download" : "Pausar download"}</Button></div>}
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4" aria-label="Armazenamento dos modelos locais"><div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100"><HardDrive className="size-4" /> Armazenamento do navegador</div><div className="grid gap-3 sm:grid-cols-3"><div><p className="text-[11px] uppercase text-muted-foreground">Modelo selecionado</p><p className="mt-1 text-sm font-semibold text-foreground">{formatBytes(modelBytes ?? modelTotal)}</p></div><div><p className="text-[11px] uppercase text-muted-foreground">Uso do site</p><p className="mt-1 text-sm font-semibold text-foreground">{formatBytes(storage.usage)}</p></div><div><p className="text-[11px] uppercase text-muted-foreground">Cota disponível</p><p className="mt-1 text-sm font-semibold text-foreground">{formatBytes(storage.quota)}</p></div></div>{storage.quota ? <div className="mt-3"><div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>Uso total do site</span><span>{storagePercent.toFixed(1)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${storagePercent}%` }} /></div></div> : <p className="mt-3 text-[11px] text-muted-foreground">O navegador não expôs a cota de armazenamento. O tamanho do modelo será medido conforme os arquivos informarem seus bytes.</p>}</div>
    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground"><span className="inline-flex items-center gap-1"><Database className="size-3.5" /> {isCached ? "Cache persistente detectado" : "Cache será criado na primeira execução"}</span><span aria-hidden="true">•</span><span>Licença: {model.license}</span><a className="underline underline-offset-2 hover:text-foreground" href={`https://huggingface.co/${model.id}`} target="_blank" rel="noreferrer">Ver card do modelo</a>{isCached && <Button type="button" variant="ghost" size="sm" className="ml-auto h-7 gap-1 text-xs text-amber-300 hover:text-amber-200" onClick={() => void deleteCache()} disabled={loading}><Trash2 className="size-3.5" /> Excluir modelo local</Button>}</div>
    <label className="block text-sm font-medium text-foreground" htmlFor="local-tutor-question">Digite sua dúvida</label><textarea id="local-tutor-question" value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ex.: Qual a diferença entre convolução e pooling?" className="min-h-28 w-full rounded-xl border border-border bg-card p-3 text-sm text-foreground outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" /><Button type="button" onClick={() => void askLocally()} disabled={loading || !question.trim()} className="gap-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400">{loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{loading ? "Carregando modelo…" : "Perguntar ao Tutor Local"}</Button>{answer && <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm leading-6 text-foreground" role="status"><strong className="mb-2 block text-emerald-200">Resposta local</strong>{answer}</div>}{error && <p className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-xs leading-5 text-amber-100" role="alert">{error}</p>}
  </div>;
}
