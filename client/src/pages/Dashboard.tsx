import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BookOpen, TrendingUp, Award, Clock, CheckCircle2, Target } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  // Mock data
  const progressData = [
    { phase: "Fase 1", completed: 0, total: 3 },
    { phase: "Fase 2", completed: 0, total: 3 },
    { phase: "Fase 3", completed: 0, total: 3 },
    { phase: "Fase 4", completed: 0, total: 3 },
    { phase: "Fase 5", completed: 0, total: 4 },
    { phase: "Fase 6", completed: 0, total: 4 },
    { phase: "Fase 7", completed: 0, total: 4 },
    { phase: "Fase 8", completed: 0, total: 5 },
  ];

  const studyTimeData = [
    { day: "Seg", hours: 0 },
    { day: "Ter", hours: 0 },
    { day: "Qua", hours: 0 },
    { day: "Qui", hours: 0 },
    { day: "Sex", hours: 0 },
    { day: "Sab", hours: 0 },
    { day: "Dom", hours: 0 },
  ];

  const skillsData = [
    { name: "Python", value: 0 },
    { name: "SQL", value: 0 },
    { name: "ML", value: 0 },
    { name: "Estatística", value: 0 },
  ];

  const COLORS = ["#00d4ff", "#a855f7", "#fbbf24", "#f97316"];

  const phases = [
    { id: 1, title: "Fundamentos Matemáticos", completed: false, modules: 3 },
    { id: 2, title: "Python Profissional", completed: false, modules: 3 },
    { id: 3, title: "SQL e Banco de Dados", completed: false, modules: 3 },
    { id: 4, title: "Análise de Dados", completed: false, modules: 3 },
    { id: 5, title: "Machine Learning", completed: false, modules: 4 },
    { id: 6, title: "Deep Learning", completed: false, modules: 4 },
    { id: 7, title: "IA Generativa", completed: false, modules: 4 },
    { id: 8, title: "Engenharia de Software", completed: false, modules: 5 },
  ];

  const achievements = [
    { id: 1, title: "Primeiro Passo", description: "Complete o primeiro módulo", icon: "🎯", unlocked: false },
    { id: 2, title: "Matemático", description: "Complete Fase 1", icon: "📐", unlocked: false },
    { id: 3, title: "Pythonista", description: "Complete Fase 2", icon: "🐍", unlocked: false },
    { id: 4, title: "Analista", description: "Complete Fase 4", icon: "📊", unlocked: false },
    { id: 5, title: "Especialista em ML", description: "Complete Fase 5", icon: "🤖", unlocked: false },
    { id: 6, title: "Mestre em IA", description: "Complete toda a trilha", icon: "👑", unlocked: false },
  ];

  const stats = [
    { label: "Progresso Geral", value: "0%", icon: TrendingUp, color: "text-primary" },
    { label: "Horas Estudadas", value: "0h", icon: Clock, color: "text-secondary" },
    { label: "Módulos Completos", value: "0", icon: CheckCircle2, color: "text-accent" },
    { label: "Certificações", value: "0", icon: Award, color: "text-green-500" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container space-y-4">
          <h1 className="text-4xl font-bold">Seu Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Bem-vindo, {user?.name || "Aluno"}! Acompanhe seu progresso na trilha de aprendizado.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container space-y-12">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-muted-foreground">{stat.label}</h3>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Progress by Phase */}
            <div className="p-6 border border-border rounded-xl bg-card">
              <h2 className="text-xl font-bold mb-6">Progresso por Fase</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="phase" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completo" />
                  <Bar dataKey="total" fill="hsl(var(--muted))" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Study Time */}
            <div className="p-6 border border-border rounded-xl bg-card">
              <h2 className="text-xl font-bold mb-6">Tempo de Estudo (Última Semana)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studyTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Distribution */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 p-6 border border-border rounded-xl bg-card">
              <h2 className="text-xl font-bold mb-6">Distribuição de Habilidades</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Achievements */}
            <div className="lg:col-span-2 p-6 border border-border rounded-xl bg-card">
              <h2 className="text-xl font-bold mb-6">Conquistas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-muted/50 border border-muted opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-semibold">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phases Progress */}
          <div className="p-6 border border-border rounded-xl bg-card space-y-6">
            <h2 className="text-xl font-bold">Progresso das Fases</h2>
            <div className="space-y-4">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => navigate(`/course/${phase.id}/overview`)}
                  className="group w-full p-4 border border-border rounded-lg bg-background hover:bg-card hover:border-primary/50 flex items-center justify-between text-left smooth-scale color-transition"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                      {phase.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{phase.modules} módulos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">0%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-border rounded-xl bg-card space-y-4">
              <h2 className="text-xl font-bold">Próximos Passos</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/learning-path")}
                  className="flex items-center gap-3 p-3 rounded-lg w-full text-left bg-transparent border-none cursor-pointer nav-button color-transition"
                >
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Comece a Fase 1</p>
                    <p className="text-xs text-muted-foreground">Fundamentos Matemáticos</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="flex items-center gap-3 p-3 rounded-lg w-full text-left bg-transparent border-none cursor-pointer nav-button color-transition"
                >
                  <Target className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-semibold text-sm">Explore Projetos</p>
                    <p className="text-xs text-muted-foreground">Aprenda na prática</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card space-y-4">
              <h2 className="text-xl font-bold">Dicas de Estudo</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>✓ Estude regularmente: 1-2 horas por dia é ideal</p>
                <p>✓ Faça exercícios: Prática é essencial para aprender</p>
                <p>✓ Construa projetos: Aplique seus conhecimentos</p>
                <p>✓ Revise conceitos: Reforce o aprendizado regularmente</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 border border-border rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 text-center space-y-4">
            <h2 className="text-2xl font-bold">Pronto para Começar?</h2>
            <p className="text-muted-foreground">Comece sua jornada de aprendizado em IA hoje mesmo.</p>
            <button
              onClick={() => navigate("/learning-path")}
              className="btn-primary inline-flex items-center gap-2 button-lift"
            >
              Ir para Trilha de Aprendizado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
