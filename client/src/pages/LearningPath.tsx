'use client';

import { ArrowRight, CheckCircle2, BookOpen, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LearningPath() {
  const [, navigate] = useLocation();

  const phases = [
    {
      id: 1,
      title: "Fundamentos Matemáticos",
      description: "Domine os conceitos matemáticos essenciais para IA: Álgebra Linear, Estatística e Probabilidade.",
      icon: "📐",
      color: "from-blue-500 to-cyan-500",
      modules: [
        { id: "linear-algebra", title: "Álgebra Linear", lessons: 12 },
        { id: "statistics", title: "Estatística", lessons: 10 },
        { id: "probability", title: "Probabilidade", lessons: 8 },
      ],
      duration: "4 semanas",
      difficulty: "Iniciante",
    },
    {
      id: 2,
      title: "Python Profissional",
      description: "Aprenda programação em Python do básico ao avançado com foco em dados e IA.",
      icon: "🐍",
      color: "from-green-500 to-emerald-500",
      modules: [
        { id: "python-basics", title: "Python Básico", lessons: 16 },
      ],
      duration: "6 semanas",
      difficulty: "Iniciante",
    },
    {
      id: 3,
      title: "SQL e Bancos de Dados",
      description: "Aprenda consultas eficientes, modelagem e manipulação de dados relacionais.",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
      modules: [
        { id: "sql-basics", title: "SQL Básico", lessons: 10 },
      ],
      duration: "4 semanas",
      difficulty: "Intermediário",
    },
    {
      id: 4,
      title: "Análise de Dados",
      description: "Processe e analise grandes volumes de dados utilizando NumPy e Pandas.",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      modules: [
        { id: "numpy", title: "NumPy", lessons: 8 },
        { id: "pandas", title: "Pandas", lessons: 10 },
      ],
      duration: "5 semanas",
      difficulty: "Intermediário",
    },
    {
      id: 5,
      title: "Machine Learning",
      description: "Construa modelos preditivos inteligentes usando algoritmos clássicos de ML.",
      icon: "🤖",
      color: "from-indigo-500 to-purple-500",
      modules: [
        { id: "ml-fundamentals", title: "Fundamentos de ML", lessons: 8 },
      ],
      duration: "8 semanas",
      difficulty: "Avançado",
    },
    {
      id: 6,
      title: "Deep Learning",
      description: "Compreenda redes neurais profundas e arquiteturas avançadas de aprendizado.",
      icon: "🧠",
      color: "from-red-500 to-pink-500",
      modules: [
        { id: "neural-networks", title: "Redes Neurais", lessons: 10 },
      ],
      duration: "8 semanas",
      difficulty: "Avançado",
    },
    {
      id: 7,
      title: "IA Generativa",
      description: "Explore Grandes Modelos de Linguagem (LLMs), arquitetura Transformer e geração de texto.",
      icon: "✨",
      color: "from-yellow-500 to-orange-500",
      modules: [
        { id: "llms", title: "Grandes Modelos de Linguagem (LLMs)", lessons: 8 },
      ],
      duration: "7 semanas",
      difficulty: "Avançado",
    },
    {
      id: 8,
      title: "Engenharia de Software para IA",
      description: "Aprenda engenharia de software robusta, Git, Docker, DevOps e boas práticas.",
      icon: "⚙️",
      color: "from-teal-500 to-cyan-500",
      modules: [
        { id: "software-engineering", title: "Engenharia de Software", lessons: 10 },
      ],
      duration: "7 semanas",
      difficulty: "Avançado",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Trilha Estruturada do Zero ao Profissional</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Trilha de Aprendizado</h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Siga nossa jornada dividida em 8 fases sequenciais. Clique em qualquer módulo para acessar o conteúdo didático completo, exemplos práticos e recursos.
          </p>
        </div>
      </section>

      {/* Path Content */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto w-full space-y-16">
        {phases.map((phase) => (
          <div key={`phase-${phase.id}`} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            {/* Phase Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl p-3 bg-slate-800/80 rounded-2xl">{phase.icon}</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${phase.color} text-white`}>
                      Fase {phase.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                      {phase.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{phase.title}</h2>
                  <p className="text-slate-400 text-sm max-w-xl">{phase.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-xl">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{phase.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-xl">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>{phase.modules.reduce((acc, m) => acc + m.lessons, 0)} aulas</span>
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phase.modules.map((module) => (
                <div
                  key={`module-${module.id}`}
                  onClick={() => navigate(`/course/${phase.id}/${module.id}`)}
                  className="bg-slate-800/50 border border-slate-700/60 hover:border-blue-500/50 p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Módulo</span>
                      <CheckCircle2 className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors text-lg">
                      {module.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-700/40 text-xs text-slate-400">
                    <span>{module.lessons} aulas didáticas</span>
                    <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Acessar &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 md:px-12 text-center text-slate-400 text-sm mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            ⚡ IA Academy
          </div>
          <p>&copy; {new Date().getFullYear()} IA Academy. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-white transition-colors">Início</a>
            <a href="/careers" className="hover:text-white transition-colors">Carreiras</a>
            <a href="/certifications" className="hover:text-white transition-colors">Certificações</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
