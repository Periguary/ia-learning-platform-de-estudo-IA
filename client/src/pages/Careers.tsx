import { ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Careers() {
  const [, navigate] = useLocation();
  const careers = [
    {
      id: 1,
      title: "Cientista de Dados",
      description: "Analisa dados complexos e cria insights para decisões estratégicas.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      salary: "R$ 8.000 - R$ 15.000",
      experience: "2-5 anos",
      responsibilities: [
        "Coletar e analisar grandes volumes de dados",
        "Criar visualizações e dashboards",
        "Comunicar insights para stakeholders",
        "Participar de decisões estratégicas",
      ],
      skills: [
        "Python/R",
        "SQL",
        "Estatística",
        "Visualização de Dados",
        "Machine Learning",
        "Comunicação",
      ],
      tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Jupyter"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos" },
        { phase: 2, title: "Python Profissional" },
        { phase: 3, title: "SQL e Banco de Dados" },
        { phase: 4, title: "Análise de Dados" },
        { phase: 5, title: "Machine Learning" },
      ],
    },
    {
      id: 2,
      title: "Engenheiro de Machine Learning",
      description: "Desenvolve e implementa modelos de ML em produção.",
      icon: "🤖",
      color: "from-green-500 to-emerald-500",
      salary: "R$ 12.000 - R$ 25.000",
      experience: "3-7 anos",
      responsibilities: [
        "Desenvolver modelos de ML escaláveis",
        "Implementar pipelines de dados",
        "Otimizar performance de modelos",
        "Colaborar com engenheiros de software",
      ],
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "DevOps",
        "Engenharia de Software",
        "Cloud",
      ],
      tools: ["Python", "TensorFlow", "PyTorch", "Docker", "Kubernetes", "AWS"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos" },
        { phase: 2, title: "Python Profissional" },
        { phase: 4, title: "Análise de Dados" },
        { phase: 5, title: "Machine Learning" },
        { phase: 6, title: "Deep Learning" },
        { phase: 8, title: "Engenharia de Software" },
      ],
    },
    {
      id: 3,
      title: "Engenheiro de IA",
      description: "Projeta e implementa sistemas de IA end-to-end.",
      icon: "🧠",
      color: "from-purple-500 to-pink-500",
      salary: "R$ 15.000 - R$ 30.000",
      experience: "4-10 anos",
      responsibilities: [
        "Arquitetar sistemas de IA",
        "Integrar múltiplos modelos",
        "Garantir escalabilidade e performance",
        "Liderar equipes técnicas",
      ],
      skills: [
        "Arquitetura de Sistemas",
        "Machine Learning",
        "Deep Learning",
        "Cloud Architecture",
        "Leadership",
        "DevOps",
      ],
      tools: ["Python", "TensorFlow", "Kubernetes", "AWS/GCP", "Docker", "MLflow"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos" },
        { phase: 2, title: "Python Profissional" },
        { phase: 5, title: "Machine Learning" },
        { phase: 6, title: "Deep Learning" },
        { phase: 7, title: "IA Generativa" },
        { phase: 8, title: "Engenharia de Software" },
      ],
    },
    {
      id: 4,
      title: "Analista de IA",
      description: "Avalia e implementa soluções de IA nas organizações.",
      icon: "📈",
      color: "from-orange-500 to-red-500",
      salary: "R$ 7.000 - R$ 12.000",
      experience: "1-3 anos",
      responsibilities: [
        "Avaliar casos de uso de IA",
        "Implementar soluções de IA",
        "Monitorar performance",
        "Comunicar resultados",
      ],
      skills: [
        "Análise de Dados",
        "Machine Learning",
        "Business Analysis",
        "Comunicação",
        "Python",
      ],
      tools: ["Python", "SQL", "Tableau", "Excel", "Git", "Jupyter"],
      roadmap: [
        { phase: 1, title: "Fundamentos Matemáticos" },
        { phase: 2, title: "Python Profissional" },
        { phase: 3, title: "SQL e Banco de Dados" },
        { phase: 4, title: "Análise de Dados" },
        { phase: 5, title: "Machine Learning" },
      ],
    },
    {
      id: 5,
      title: "Engenheiro de Software com IA",
      description: "Integra IA em aplicações de software.",
      icon: "⚙️",
      color: "from-indigo-500 to-purple-500",
      salary: "R$ 10.000 - R$ 20.000",
      experience: "3-7 anos",
      responsibilities: [
        "Desenvolver APIs de IA",
        "Integrar modelos em aplicações",
        "Otimizar performance",
        "Manter código de qualidade",
      ],
      skills: [
        "Engenharia de Software",
        "Python/JavaScript",
        "Machine Learning",
        "DevOps",
        "Cloud",
      ],
      tools: ["Python", "FastAPI", "Docker", "Kubernetes", "AWS", "Git"],
      roadmap: [
        { phase: 2, title: "Python Profissional" },
        { phase: 3, title: "SQL e Banco de Dados" },
        { phase: 5, title: "Machine Learning" },
        { phase: 6, title: "Deep Learning" },
        { phase: 8, title: "Engenharia de Software" },
      ],
    },
    {
      id: 6,
      title: "Especialista em IA Generativa",
      description: "Trabalha com LLMs, RAG e sistemas generativos.",
      icon: "✨",
      color: "from-yellow-500 to-orange-500",
      salary: "R$ 12.000 - R$ 25.000",
      experience: "2-5 anos",
      responsibilities: [
        "Desenvolver aplicações com LLMs",
        "Fine-tuning de modelos",
        "Implementar RAG",
        "Criar agentes de IA",
      ],
      skills: [
        "LLMs",
        "Prompt Engineering",
        "RAG",
        "Python",
        "Agentes de IA",
      ],
      tools: ["Python", "LangChain", "OpenAI", "Hugging Face", "Pinecone", "FastAPI"],
      roadmap: [
        { phase: 2, title: "Python Profissional" },
        { phase: 4, title: "Análise de Dados" },
        { phase: 5, title: "Machine Learning" },
        { phase: 6, title: "Deep Learning" },
        { phase: 7, title: "IA Generativa" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Oportunidades de Carreira</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore 6 perfis profissionais em IA com diferentes especializações e níveis de experiência.
          </p>
        </div>
      </section>

      {/* Careers Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <button
                key={`career-${career.id}`}
                onClick={() => navigate(`/career/${career.id}`)}
                className="group h-full p-6 border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col text-left"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                  {/* Icon */}
                  <div className="text-5xl mb-4">{career.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {career.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 flex-1">
                    {career.description}
                  </p>

                  {/* Salary */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Salário Médio</p>
                    <p className="font-semibold text-primary">{career.salary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{career.experience}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {career.skills.length} habilidades
                    </span>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-semibold">Explorar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Comparação de Carreiras</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja como as diferentes carreiras em IA se comparam.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Profissão</th>
                  <th className="text-left py-4 px-4 font-semibold">Dificuldade</th>
                  <th className="text-left py-4 px-4 font-semibold">Salário</th>
                  <th className="text-left py-4 px-4 font-semibold">Experiência</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((career) => (
                  <tr key={career.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{career.title}</td>
                    <td className="py-4 px-4 text-muted-foreground">Intermediário</td>
                    <td className="py-4 px-4 text-primary font-semibold">{career.salary}</td>
                    <td className="py-4 px-4 text-muted-foreground">{career.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Escolha Seu Caminho</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada carreira tem seu próprio roadmap personalizado. Comece sua trilha de aprendizado hoje.
            </p>
          </div>

          <button
            onClick={() => navigate("/learning-path")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Explorar Trilha de Aprendizado <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
