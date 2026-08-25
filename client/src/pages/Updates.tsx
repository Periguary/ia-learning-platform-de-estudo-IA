import React from "react";
import { ArrowUpRight, BookOpen, CalendarDays, CheckCircle2, RefreshCw, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useLocation } from "wouter";
import { updatesCatalog, updatesLastReviewedAt, type AIUpdate } from "@/data/updatesCatalog";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";

const moduleRoutes: Record<string, string> = {
  llms: "/course/7/llms",
  "software-engineering": "/course/8/software-engineering",
  "neural-networks": "/course/6/neural-networks",
  "computer-vision": "/course/6/computer-vision",
};

const categoryStyles: Record<string, string> = {
  Modelos: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Agentes: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Open Source": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Segurança: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Pesquisa: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export default function Updates() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const approvedQuery = trpc.ai.updates.useQuery();
  const favoriteQuery = trpc.ai.updateFavorites.useQuery();
  const pendingQuery = trpc.ai.pendingUpdates.useQuery(undefined, { enabled: isAdmin });
  const refreshMutation = trpc.ai.refreshUpdates.useMutation({
    onSuccess: () => {
      void pendingQuery.refetch();
    },
  });
  const reviewMutation = trpc.ai.reviewUpdate.useMutation({
    onSuccess: () => {
      void pendingQuery.refetch();
      void approvedQuery.refetch();
    },
  });
  const toggleFavoriteMutation = trpc.ai.toggleUpdateFavorite.useMutation({
    onSuccess: () => void favoriteQuery.refetch(),
  });
  const favoriteKeys = new Set(favoriteQuery.data ?? []);

  const approvedUpdates: AIUpdate[] = (approvedQuery.data ?? []).map(item => ({
    id: `candidate-${item.id}`,
    title: item.title,
    summary: item.summary,
    category: item.category as AIUpdate["category"],
    sourceName: item.sourceName,
    sourceUrl: item.sourceUrl,
    publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 10) : new Date(item.createdAt).toISOString().slice(0, 10),
    relatedModules: JSON.parse(item.relatedModules) as string[],
    learningAction: item.learningAction,
  }));
  const visibleUpdates = [...updatesCatalog, ...approvedUpdates];

  return (
    <div className="w-full">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
            <Sparkles className="size-4" />
            Radar de IA
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Atualizações que viram aprendizado
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Acompanhe mudanças relevantes no ecossistema de IA e descubra qual aula revisar antes de experimentar uma nova técnica.
            </p>
          </div>
          {isAdmin && (
            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Painel Editorial Avançado</h2>
                  <p className="text-sm text-muted-foreground">Monitore as fontes oficiais de IA e aprove ou rejeite itens antes de irem para o Radar.</p>
                </div>
                <Button
                  type="button"
                  onClick={() => refreshMutation.mutate()}
                  disabled={refreshMutation.isPending}
                  className="gap-2 bg-gradient-to-r from-primary to-secondary"
                >
                  <RefreshCw className={`size-4 ${refreshMutation.isPending ? "animate-spin" : ""}`} />
                  {refreshMutation.isPending ? "Varrendo fontes..." : "Executar varredura automática"}
                </Button>
              </div>
              {refreshMutation.data && (
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
                  Varredura concluída: {refreshMutation.data.scanned} fontes escaneadas, {refreshMutation.data.created} novos candidatos criados, {refreshMutation.data.skipped} já indexados, {refreshMutation.data.failed} falhas tratadas.
                </div>
              )}
            </div>
          )}
          <div className="grid gap-4 pt-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <CheckCircle2 className="mb-3 size-5 text-emerald-400" />
              <p className="font-semibold">Fontes oficiais</p>
              <p className="mt-1 text-sm text-muted-foreground">Cada item aponta para a publicação original.</p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <ShieldCheck className="mb-3 size-5 text-primary" />
              <p className="font-semibold">Revisão editorial</p>
              <p className="mt-1 text-sm text-muted-foreground">Atualizações entram como candidatas antes de alterar a trilha.</p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <RefreshCw className="mb-3 size-5 text-secondary" />
              <p className="font-semibold">Ciclo contínuo</p>
              <p className="mt-1 text-sm text-muted-foreground">O radar pode ser atualizado sem substituir o conteúdo-base sem revisão.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Curadoria atual</p>
            <h2 className="mt-2 text-3xl font-bold">O que mudou no cenário</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use a estrela para salvar artigos e notícias importantes para leitura posterior.</p>
          </div>
          <p className="text-sm text-muted-foreground">Última revisão: {new Date(`${updatesLastReviewedAt}T12:00:00`).toLocaleDateString("pt-BR")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleUpdates.map(update => (
            <article key={update.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[update.category] ?? "bg-muted text-muted-foreground"}`}>
                  {update.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {new Date(`${update.publishedAt}T12:00:00`).toLocaleDateString("pt-BR")}
                  </span>
                  <button
                    type="button"
                    aria-label={favoriteKeys.has(update.id) ? `Remover ${update.title} dos favoritos` : `Favoritar ${update.title}`}
                    title={favoriteKeys.has(update.id) ? "Remover dos favoritos" : "Salvar para ler depois"}
                    onClick={() => toggleFavoriteMutation.mutate({ updateKey: update.id })}
                    disabled={toggleFavoriteMutation.isPending}
                    className={`rounded-lg p-2 transition-colors hover:bg-primary/10 ${favoriteKeys.has(update.id) ? "text-amber-400" : "text-muted-foreground hover:text-amber-400"}`}
                  >
                    <Star className={`size-4 ${favoriteKeys.has(update.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold leading-tight">{update.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{update.summary}</p>

              <div className="mt-5 rounded-xl bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Como estudar</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">{update.learningAction}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {update.relatedModules.map(moduleId => (
                  <Button
                    key={moduleId}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moduleRoutes[moduleId] && navigate(moduleRoutes[moduleId])}
                    disabled={!moduleRoutes[moduleId]}
                    className="text-xs"
                  >
                    Revisar {moduleId === "llms" ? "LLMs" : moduleId === "neural-networks" ? "Redes Neurais" : moduleId === "computer-vision" ? "Visão Computacional" : "Engenharia de Software"}
                  </Button>
                ))}
                <Button asChild variant="ghost" size="sm" className="ml-auto gap-1 text-xs text-primary">
                  <a href={update.sourceUrl} target="_blank" rel="noreferrer">
                    Fonte: {update.sourceName}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {isAdmin && pendingQuery.data && pendingQuery.data.length > 0 && (
          <section className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Fila editorial</p>
                <h2 className="mt-2 text-2xl font-bold">Candidatos aguardando revisão</h2>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{pendingQuery.data.length} pendente(s)</span>
            </div>
            <div className="mt-5 space-y-3">
              {pendingQuery.data.map(candidate => (
                <div key={candidate.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">{candidate.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{candidate.summary}</p>
                    <a className="mt-2 inline-flex text-xs text-primary underline-offset-4 hover:underline" href={candidate.sourceUrl} target="_blank" rel="noreferrer">Ver fonte original</a>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button type="button" size="sm" onClick={() => reviewMutation.mutate({ id: candidate.id, status: "approved" })} disabled={reviewMutation.isPending}>Aprovar</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => reviewMutation.mutate({ id: candidate.id, status: "rejected" })} disabled={reviewMutation.isPending}>Rejeitar</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Nota editorial:</strong> o radar acompanha fontes públicas e sugere caminhos de estudo. Ele não publica automaticamente alterações na trilha nem substitui revisão humana; isso evita que uma notícia, benchmark ou anúncio comercial seja tratado como conteúdo didático sem contexto.
        </div>
      </section>
    </div>
  );
}
