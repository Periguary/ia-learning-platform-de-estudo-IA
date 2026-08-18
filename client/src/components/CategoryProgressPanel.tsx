import React from "react";

type CategoryProgress = {
  id: number;
  title: string;
  completed: number;
  total: number;
  percentage: number;
};

type CategoryProgressPanelProps = {
  categories: CategoryProgress[];
};

function buildSparklinePoints(percentage: number, index: number) {
  const baseline = 48;
  const lift = Math.max(5, Math.round((percentage / 100) * 34));
  const variation = (index % 3) * 4;
  return `0,${baseline} 24,${baseline - variation} 48,${baseline - lift / 2} 72,${baseline - lift + variation} 96,${baseline - lift}`;
}

export default function CategoryProgressPanel({ categories }: CategoryProgressPanelProps) {
  const completedCategories = categories.filter(category => category.percentage >= 100).length;
  const average = categories.length ? Math.round(categories.reduce((sum, category) => sum + category.percentage, 0) / categories.length) : 0;

  return (
    <section className="futurist-panel rounded-none p-6 md:p-8" aria-labelledby="category-stats-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="futurist-kicker">ANALYTICS // CATEGORY MATRIX</p>
          <h2 id="category-stats-heading" className="mt-2 text-2xl font-black uppercase tracking-tight">Estatísticas por categoria de IA</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Progresso calculado a partir das aulas concluídas em cada fase real da trilha.</p>
        </div>
        <div className="flex gap-5 border border-primary/20 bg-primary/5 px-4 py-3 text-right">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Média</p><p className="text-xl font-black text-primary">{average}%</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Completas</p><p className="text-xl font-black text-accent">{completedCategories}/{categories.length}</p></div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => (
          <article key={category.id} className="border border-primary/20 bg-background/60 p-4" aria-label={`${category.title}: ${category.percentage}% concluído`}>
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-black uppercase tracking-wider text-foreground">Fase {category.id}</p><h3 className="mt-1 text-sm font-bold text-muted-foreground">{category.title}</h3></div>
              <span className="text-lg font-black text-primary">{category.percentage}%</span>
            </div>
            <svg className="mt-4 h-16 w-full" viewBox="0 0 96 52" role="img" aria-label={`Tendência de progresso em ${category.title}`} preserveAspectRatio="none">
              <defs><linearGradient id={`category-gradient-${category.id}`} x1="0" x2="1"><stop offset="0" stopColor="hsl(var(--primary))" /><stop offset="1" stopColor="hsl(var(--secondary))" /></linearGradient></defs>
              <polyline points={buildSparklinePoints(category.percentage, index)} fill="none" stroke={`url(#category-gradient-${category.id})`} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="48" x2="96" y2="48" stroke="hsl(var(--border))" strokeWidth="1" />
            </svg>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>{category.completed}/{category.total} aulas</span><span className={category.percentage >= 100 ? "text-accent" : "text-primary"}>{category.percentage >= 100 ? "CONCLUÍDA" : "EM PROGRESSO"}</span></div>
            <div className="mt-2 h-1.5 bg-muted"><div className="h-full bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: `${category.percentage}%` }} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
