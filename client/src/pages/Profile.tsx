import React, { useMemo } from "react";
import { Award, ArrowRight, CalendarDays, CheckCircle2, Clock3, Medal, ShieldCheck, Sparkles, Trophy, UserRound } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { interactiveCertificationsCatalog } from "@/data/interactiveCertificationCatalog";
import { formatCompletionDate, getCertificationStats, readAnswerHistory, readCompletionHistory } from "@/data/certificationProgress";

export default function Profile() {
  const { user, loading } = useAuth();
  const answerHistory = useMemo(() => readAnswerHistory(), []);
  const completionHistory = useMemo(() => readCompletionHistory(), []);
  const displayName = user?.name?.trim() || "Aluno IA Academy";
  const initials = displayName.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "IA";

  const certifications = useMemo(() => interactiveCertificationsCatalog.map(cert => {
    const stats = getCertificationStats(cert, answerHistory[cert.id]);
    const history = completionHistory[cert.id];
    return { cert, stats, history, completed: stats.completed || Boolean(history) };
  }).filter(item => item.completed), [answerHistory, completionHistory]);

  const completedCount = certifications.length;
  const perfectCount = certifications.filter(item => item.stats.scorePercentage === 100 || item.history?.scorePercentage === 100).length;
  const badges = [
    { id: "first", label: "Primeira Conquista", description: "Conclua seu primeiro simulador", unlocked: completedCount >= 1, icon: Medal },
    { id: "perfect", label: "Aproveitamento Excelente", description: "Acerte todas as questões de um simulador", unlocked: perfectCount >= 1, icon: Sparkles },
    { id: "specialist", label: "Especialista em IA", description: "Conclua todas as certificações disponíveis", unlocked: completedCount === interactiveCertificationsCatalog.length, icon: Trophy },
  ];

  return <div className="container py-12 space-y-10">
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-secondary/10 p-8 md:p-10">
      <div className="absolute -right-12 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-2xl font-black text-white shadow-lg shadow-primary/25" aria-label={`Avatar de ${displayName}`}>{initials}</div>
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Meu perfil de aprendizagem</p><h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{displayName}</h1><p className="mt-2 text-muted-foreground">Acompanhe suas conquistas, simulados e evolução em IA.</p></div>
        </div>
        <Button asChild className="gap-2"><a href="/interactive-certifications">Continuar certificações <ArrowRight className="size-4" /></a></Button>
      </div>
    </section>

    <section className="grid gap-4 sm:grid-cols-3" aria-label="Resumo do perfil">
      <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="size-4 text-primary" /><span className="text-sm">Trilhas concluídas</span></div><p className="mt-3 text-3xl font-bold">{completedCount}<span className="ml-1 text-base font-normal text-muted-foreground">/ {interactiveCertificationsCatalog.length}</span></p></div>
      <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><Trophy className="size-4 text-amber-400" /><span className="text-sm">Medalhas conquistadas</span></div><p className="mt-3 text-3xl font-bold">{badges.filter(badge => badge.unlocked).length}<span className="ml-1 text-base font-normal text-muted-foreground">/ {badges.length}</span></p></div>
      <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><Award className="size-4 text-emerald-400" /><span className="text-sm">Aproveitamentos perfeitos</span></div><p className="mt-3 text-3xl font-bold">{perfectCount}</p></div>
    </section>

    <section aria-labelledby="badges-heading" className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Conquistas</p><h2 id="badges-heading" className="text-2xl font-bold">Medalhas do seu percurso</h2></div><div className="grid gap-4 md:grid-cols-3">{badges.map(badge => { const Icon = badge.icon; return <article key={badge.id} className={`rounded-2xl border p-5 transition-colors ${badge.unlocked ? "border-amber-400/40 bg-amber-400/10" : "border-border bg-card opacity-60"}`}><div className="flex items-start justify-between gap-4"><div className={`grid size-11 place-items-center rounded-xl ${badge.unlocked ? "bg-amber-300/20 text-amber-300" : "bg-muted text-muted-foreground"}`}><Icon className="size-6" /></div>{badge.unlocked ? <CheckCircle2 className="size-5 text-emerald-400" aria-label="Medalha conquistada" /> : <span className="text-xs text-muted-foreground">Bloqueada</span>}</div><h3 className="mt-4 font-bold">{badge.label}</h3><p className="mt-1 text-sm text-muted-foreground">{badge.description}</p></article>; })}</div></section>

    <section aria-labelledby="history-heading" className="space-y-4"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Registro de estudos</p><h2 id="history-heading" className="text-2xl font-bold">Histórico de certificações</h2></div><span className="text-sm text-muted-foreground">{loading ? "Carregando perfil…" : `${certifications.length} registros concluídos`}</span></div>{certifications.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><UserRound className="mx-auto size-10 text-muted-foreground" /><h3 className="mt-4 text-lg font-bold">Seu histórico começará aqui</h3><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Conclua um simulador para registrar sua primeira certificação e liberar suas medalhas.</p><Button asChild className="mt-5 gap-2"><a href="/interactive-certifications">Abrir simuladores <ArrowRight className="size-4" /></a></Button></div> : <div className="space-y-3">{certifications.map(({ cert, stats, history }) => <article key={cert.id} className="rounded-2xl border border-border bg-card p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="size-6" /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">{cert.issuer} · {cert.level}</p><h3 className="mt-1 font-bold">{cert.title}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatCompletionDate(history?.completedAt)}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> {cert.durationHours}h estimadas</span><span>{history?.attempts ?? 1} tentativa(s)</span></div></div></div><div className="text-left md:text-right"><p className="text-xs text-muted-foreground">Aproveitamento</p><p className="text-2xl font-bold text-emerald-400">{history?.scorePercentage ?? stats.scorePercentage}%</p><p className="text-xs text-muted-foreground">{history?.correctCount ?? stats.correctCount} de {cert.quiz.length} questões</p></div></div></article>)}</div>}</section>
  </div>;
}
