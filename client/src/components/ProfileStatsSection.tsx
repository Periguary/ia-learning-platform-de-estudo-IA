import React from "react";
import { BarChart3, Clock3, Flame, Trophy } from "lucide-react";

type ActivityItem = { day: string; date: string; completedLessons: number; certificationAttempts: number };
type BadgeTarget = { label: string; description: string };

type Props = {
  studyHours: number;
  studyStreak: { currentStreak: number; bestStreak: number; activeToday: boolean };
  weeklyActivity: ActivityItem[];
  activityTotal: number;
  activityMax: number;
  nextBadge?: BadgeTarget;
  nextBadgeProgress: number;
  unlockedBadges: number;
  totalBadges: number;
};

function formatStudyTime(hours: number) {
  const minutes = Math.round(hours * 60);
  if (minutes < 60) return `${minutes} min`;
  const wholeHours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${wholeHours}h ${remainingMinutes}min` : `${wholeHours}h`;
}

export default function ProfileStatsSection({ studyHours, studyStreak, weeklyActivity, activityTotal, activityMax, nextBadge, nextBadgeProgress, unlockedBadges, totalBadges }: Props) {
  return <section aria-labelledby="study-stats-heading" className="space-y-4">
    <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Visão de progresso</p><h2 id="study-stats-heading" className="text-2xl font-bold">Suas estatísticas de estudo</h2></div>
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className="space-y-4">
        <div className="futurist-panel rounded-none p-6"><div className="flex items-center gap-2 text-muted-foreground"><Clock3 className="size-5 text-primary" /><span className="text-sm font-medium">Tempo total estimado de estudo</span></div><p className="mt-4 text-4xl font-bold">{formatStudyTime(studyHours)}</p><p className="mt-2 text-sm text-muted-foreground">Calculado a partir das aulas marcadas como concluídas na trilha.</p></div>
        <div className="futurist-panel rounded-none p-6"><div className="flex items-center gap-2 text-muted-foreground"><Flame className="size-5 text-orange-400" /><span className="text-sm font-medium">Sequência de estudo</span></div><p className="mt-3 text-3xl font-bold">{studyStreak.currentStreak} dias consecutivos</p><p className="mt-1 text-sm text-muted-foreground">Melhor sequência: {studyStreak.bestStreak} dias. {studyStreak.activeToday ? "Você estudou hoje." : "Retome hoje para manter a sequência."}</p></div>
      </div>
      <div className="futurist-panel rounded-none p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-muted-foreground"><BarChart3 className="size-5 text-secondary" /><span className="text-sm font-medium">Atividade dos últimos 7 dias</span></div><span className="text-xs text-muted-foreground">{activityTotal} ações registradas</span></div><div className="mt-6 flex h-40 items-end justify-between gap-2 futurist-scanline" aria-label="Gráfico de atividade semanal">{weeklyActivity.map(item => { const total = item.completedLessons + item.certificationAttempts; return <div key={item.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-semibold text-primary">{total || ""}</span><div className="w-full max-w-10 rounded-t-none bg-gradient-to-t from-primary via-secondary to-accent transition-[height] duration-500 shadow-[0_0_14px_hsla(var(--primary),0.3)]" style={{ height: `${Math.max(4, Math.round((total / activityMax) * 100))}%` }} aria-label={`${item.day}: ${total} ações`} /><span className="text-[11px] text-muted-foreground">{item.day}</span></div>; })}</div>{activityTotal === 0 && <p className="mt-3 text-center text-xs text-muted-foreground">Conclua uma aula ou certificação para começar a registrar sua atividade.</p>}</div>
    </div>
    <div className="futurist-panel rounded-none p-6"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-muted-foreground"><Trophy className="size-5 text-amber-400" /><span className="text-sm font-medium">{nextBadge ? "Próxima medalha" : "Percurso completo"}</span></div><h3 className="mt-3 text-xl font-bold">{nextBadge?.label || "Todas as medalhas conquistadas"}</h3><p className="mt-1 text-sm text-muted-foreground">{nextBadge?.description || "Você concluiu todas as conquistas desta etapa."}</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{nextBadgeProgress}%</span></div><div className="mt-5 h-3 overflow-hidden border border-primary/20 bg-muted" role="progressbar" aria-label={`Progresso até ${nextBadge?.label || "todas as medalhas"}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={nextBadgeProgress}><div className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-[width] duration-500" style={{ width: `${nextBadgeProgress}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{nextBadge ? `${unlockedBadges} de ${totalBadges} medalhas desbloqueadas` : "Parabéns pela consistência!"}</p></div>
  </section>;
}
