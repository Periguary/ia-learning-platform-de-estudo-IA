'use client';

import { ArrowRight, Sparkles, BookOpen, Award, Users, CheckCircle, Play, ShieldCheck, Zap, Compass, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { coursesData } from "@/data/coursesData";

export default function Home() {
  const { user } = useAuth();
  const availableModuleCount = Object.keys(coursesData).length;
  const [, navigate] = useLocation();

  const categories = [
    { title: "Inteligência Artificial", courses: "42 Cursos", icon: "🤖", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { title: "Machine Learning", courses: "38 Cursos", icon: "🧠", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { title: "Data Science & Pandas", courses: "30 Cursos", icon: "📊", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    { title: "Python & Programação", courses: "45 Cursos", icon: "🐍", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    { title: "Deep Learning & LLMs", courses: "25 Cursos", icon: "⚡", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
    { title: "SQL & Bancos de Dados", courses: "20 Cursos", icon: "🗄️", color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
  ];

  const features = [
    {
      title: "Conteúdo de Alto Padrão",
      description: "Acesse materiais modernos, selecionados por especialistas globais para aprendizado rápido e profundo.",
      icon: BookOpen,
    },
    {
      title: "No Seu Próprio Ritmo",
      description: "Flexibilidade total de horários. Ajuste sua carga diária e estude quando e onde quiser.",
      icon: Zap,
    },
    {
      title: "Certificado Reconhecido",
      description: "Conquiste certificados válidos que destacam suas novas competências no mercado de trabalho.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span>Nova Trilha de IA Generativa e LLMs Disponível!</span>
        <button onClick={() => navigate("/learning-path")} className="underline hover:text-blue-200 ml-2 font-bold cursor-pointer">
          Explorar &rarr;
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 text-sm font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Plataforma Líder em Educação de IA</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Aprenda o que importa para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">acelerar sua carreira</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed">
              Domine Inteligência Artificial, Machine Learning, Deep Learning e Ciência de Dados do zero ao nível profissional com trilhas estruturadas e projetos reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {user ? (
                <Button
                  onClick={() => navigate("/learning-path")}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                >
                  Continuar Trilha <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
                >
                  <a href={getLoginUrl()}>
                    Começar Gratuitamente <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              )}

              <Button
                onClick={() => navigate("/learning-path")}
                variant="outline"
                className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 h-12 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 text-base transition-all cursor-pointer"
              >
                <Compass className="w-5 h-5 text-blue-400" /> Explorar Trilha
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-blue-400">200+</p>
                <p className="text-xs text-slate-400">Horas de Conteúdo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">8 Fases</p>
                <p className="text-xs text-slate-400">Trilha Completa</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">{availableModuleCount}</p>
                <p className="text-xs text-slate-400">Módulos disponíveis</p>
              </div>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs text-slate-400 font-mono">ia-academy.platform</span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fase 1: Fundamentos Matemáticos</p>
                    <p className="text-xs text-slate-400">Álgebra Linear, Estatística e Probabilidade</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fase 5: Machine Learning</p>
                    <p className="text-xs text-slate-400">Modelos Preditivos e Scikit-Learn</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Fase 7: IA Generativa & LLMs</p>
                    <p className="text-xs text-slate-400">Transformers, RAG e Agentes</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/learning-path")}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" /> Iniciar Meus Estudos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-6 md:px-12 bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Explore por Categoria</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Encontre exatamente o que você precisa para dominar a tecnologia do futuro.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/learning-path")}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-slate-800/80 rounded-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${cat.color}`}>{cat.courses}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">Acessar trilha <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-12 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Por que escolher a IA Academy?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Desenvolvido por especialistas para garantir o seu sucesso profissional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center font-bold">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-200">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology and evidence */}
      <section className="py-20 px-6 md:px-12 bg-slate-950">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-indigo-500/10 p-8 md:p-10">
            <div className="flex items-center gap-3 text-blue-300 mb-5">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Como a plataforma funciona</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Aprendizado organizado para você praticar, acompanhar e evoluir.</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">A trilha combina aulas didáticas, projetos guiados, referências externas e acompanhamento local do progresso. Cada módulo mostra seu conteúdo real, duração e próxima ação.</p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {["Aulas estruturadas", "Projetos aplicados", "Progresso por módulo"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-100">{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
            <h3 className="text-xl font-bold text-white">Explore antes de decidir</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">Veja a trilha, abra uma aula e conheça os projetos disponíveis. Não usamos avaliações ou depoimentos inventados para representar a experiência dos alunos.</p>
            <div className="mt-8 space-y-4">
              {[
                ["01", "Escolha uma fase", "Comece pelos fundamentos ou avance para IA generativa."],
                ["02", "Leia uma aula", "O conteúdo didático fica disponível dentro do módulo."],
                ["03", "Acompanhe seu ritmo", "Marque aulas concluídas e veja o progresso no Dashboard."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4 items-start">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">{number}</span>
                  <div><p className="font-semibold text-slate-100">{title}</p><p className="mt-1 text-sm text-slate-400">{description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 md:px-12 text-center text-slate-400 text-sm mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <Zap className="w-5 h-5 text-blue-500" /> IA Academy
          </div>
          <p>&copy; {new Date().getFullYear()} IA Academy. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/learning-path" className="hover:text-white transition-colors">Trilha</a>
            <a href="/careers" className="hover:text-white transition-colors">Carreiras</a>
            <a href="/certifications" className="hover:text-white transition-colors">Certificações</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
