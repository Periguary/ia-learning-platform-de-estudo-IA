import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LearningPath() {
  const [, navigate] = useLocation();
  const phases = [
    {
      id: 1,
      title: "Fundamentos Matemáticos",
      description: "Domine os conceitos matemáticos essenciais para IA",
      icon: "📐",
      modules: [
        { id: "linear-algebra", title: "Álgebra Linear", lessons: 12 },
        { id: "statistics", title: "Estatística", lessons: 10 },
        { id: "probability", title: "Probabilidade", lessons: 8 },
      ],
      duration: "4 semanas",
      difficulty: "Iniciante",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Python Profissional",
      description: "Aprenda Python do básico ao avançado",
      icon: "🐍",
      modules: [
        { id: "python-basics", title: "Python Básico", lessons: 15 },
        { id: "python-intermediate", title: "Python Intermediário", lessons: 12 },
        { id: "python-advanced", title: "Python Avançado", lessons: 10 },
      ],
      duration: "6 semanas",
      difficulty: "Iniciante",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "SQL e Banco de Dados",
      description: "Domine consultas e design de banco de dados",
      icon: "🗄️",
      modules: [
        { id: "sql-basics", title: "SQL Básico", lessons: 10 },
        { id: "sql-intermediate", title: "SQL Intermediário", lessons: 12 },
        { id: "sql-advanced", title: "SQL Avançado", lessons: 8 },
      ],
      duration: "4 semanas",
      difficulty: "Intermediário",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      title: "Análise de Dados",
      description: "Trabalhe com dados usando NumPy, Pandas e Visualização",
      icon: "📊",
      modules: [
        { id: "numpy", title: "NumPy", lessons: 8 },
        { id: "pandas", title: "Pandas", lessons: 10 },
        { id: "visualization", title: "Visualização de Dados", lessons: 9 },
      ],
      duration: "5 semanas",
      difficulty: "Intermediário",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      title: "Machine Learning",
      description: "Crie modelos preditivos com algoritmos clássicos",
      icon: "🤖",
      modules: [
        { id: "ml-fundamentals", title: "Fundamentos", lessons: 8 },
        { id: "supervised", title: "Aprendizado Supervisionado", lessons: 12 },
        { id: "unsupervised", title: "Aprendizado Não-supervisionado", lessons: 10 },
        { id: "metrics", title: "Métricas de Avaliação", lessons: 6 },
      ],
      duration: "8 semanas",
      difficulty: "Avançado",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Deep Learning",
      description: "Trabalhe com redes neurais e arquiteturas modernas",
      icon: "🧠",
      modules: [
        { id: "neural-networks", title: "Redes Neurais", lessons: 10 },
        { id: "cnn", title: "CNN - Visão Computacional", lessons: 9 },
        { id: "rnn", title: "RNN - Séries Temporais", lessons: 8 },
        { id: "transformers", title: "Transformers", lessons: 10 },
      ],
      duration: "8 semanas",
      difficulty: "Avançado",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 7,
      title: "IA Generativa",
      description: "Explore LLMs, RAG e agentes de IA",
      icon: "✨",
      modules: [
        { id: "llms", title: "Grandes Modelos de Linguagem", lessons: 8 },
        { id: "embeddings", title: "Embeddings", lessons: 6 },
        { id: "rag", title: "RAG - Retrieval Augmented Generation", lessons: 7 },
        { id: "agents", title: "Agentes de IA", lessons: 8 },
      ],
      duration: "7 semanas",
      difficulty: "Avançado",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 8,
      title: "Engenharia de Software para IA",
      description: "Deploy, DevOps e produção de modelos",
      icon: "⚙️",
      modules: [
        { id: "git", title: "Git e Versionamento", lessons: 5 },
        { id: "docker", title: "Docker e Containers", lessons: 7 },
        { id: "apis", title: "APIs e FastAPI", lessons: 8 },
        { id: "cloud", title: "Cloud Computing", lessons: 8 },
        { id: "devops", title: "DevOps e CI/CD", lessons: 7 },
      ],
      duration: "7 semanas",
      difficulty: "Avançado",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Trilha de Aprendizado</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Siga uma trilha estruturada de 8 fases que leva você do iniciante ao especialista em Inteligência Artificial.
          </p>
        </div>
      </section>

      {/* Phases Grid */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-12">
            {phases.map((phase) => (
              <div key={`phase-${phase.id}`} className="space-y-6">
                {/* Phase Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{phase.icon}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${phase.color} text-white`}>
                          Fase {phase.id}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          {phase.difficulty}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold">{phase.title}</h2>
                      <p className="text-muted-foreground">{phase.description}</p>
                      <div className="flex gap-6 pt-2 text-sm text-muted-foreground">
                        <span>⏱️ {phase.duration}</span>
                        <span>📚 {phase.modules.reduce((acc, m) => acc + m.lessons, 0)} aulas</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/course/${phase.id}/overview`)}
                    className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    Explorar <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Modules Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-12">
                  {phase.modules.map((module) => (
                    <button
                      key={`module-${module.id}`}
                      onClick={() => navigate(`/course/${phase.id}/${module.id}`)}
                      className="group p-4 border border-border rounded-lg bg-background hover:bg-card hover:border-primary/50 transition-all text-left w-full"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {module.title}
                        </h3>
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">{module.lessons} aulas</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Seu Progresso</h2>
              <p className="text-muted-foreground">Acompanhe seu desenvolvimento ao longo da trilha</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progresso Geral</span>
                <span>0%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Fases Completas</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-2xl font-bold text-secondary">0</p>
                <p className="text-sm text-muted-foreground">Módulos Completos</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background">
                <p className="text-2xl font-bold text-accent">0</p>
                <p className="text-sm text-muted-foreground">Aulas Assistidas</p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 h-12"
            >
              <a href="/dashboard">Ver Dashboard Completo</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
