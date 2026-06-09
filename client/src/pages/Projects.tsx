import { Link } from "wouter";
import { ArrowRight, Code2, Database, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Previsão de Vendas",
      description: "Crie um modelo de regressão para prever vendas futuras usando dados históricos.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      difficulty: "Intermediário",
      duration: "2 semanas",
      icon: "📈",
      color: "from-blue-500 to-cyan-500",
      skills: ["Regressão Linear", "Feature Engineering", "Validação Cruzada"],
    },
    {
      id: 2,
      title: "Análise de Churn",
      description: "Identifique clientes em risco de sair usando classificação e análise exploratória.",
      technologies: ["Python", "Pandas", "XGBoost", "Plotly"],
      difficulty: "Intermediário",
      duration: "2 semanas",
      icon: "👥",
      color: "from-green-500 to-emerald-500",
      skills: ["Classificação", "Desbalanceamento de Classes", "Business Analytics"],
    },
    {
      id: 3,
      title: "Sistema de Recomendação",
      description: "Construa um sistema que recomenda produtos baseado em preferências do usuário.",
      technologies: ["Python", "NumPy", "Scikit-learn", "Pandas"],
      difficulty: "Avançado",
      duration: "3 semanas",
      icon: "⭐",
      color: "from-purple-500 to-pink-500",
      skills: ["Filtragem Colaborativa", "Similaridade", "Otimização"],
    },
    {
      id: 4,
      title: "Classificador de Imagens",
      description: "Treine uma CNN para classificar imagens usando Transfer Learning.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV"],
      difficulty: "Avançado",
      duration: "3 semanas",
      icon: "🖼️",
      color: "from-orange-500 to-red-500",
      skills: ["Deep Learning", "Transfer Learning", "Visão Computacional"],
    },
    {
      id: 5,
      title: "Chatbot com RAG",
      description: "Crie um chatbot inteligente que responde perguntas usando Retrieval Augmented Generation.",
      technologies: ["Python", "LangChain", "OpenAI", "Pinecone"],
      difficulty: "Avançado",
      duration: "3 semanas",
      icon: "💬",
      color: "from-indigo-500 to-purple-500",
      skills: ["LLMs", "Embeddings", "RAG", "NLP"],
    },
    {
      id: 6,
      title: "API de Machine Learning",
      description: "Desenvolva uma API REST que expõe seu modelo de ML para produção.",
      technologies: ["Python", "FastAPI", "Docker", "PostgreSQL"],
      difficulty: "Avançado",
      duration: "2 semanas",
      icon: "🔌",
      color: "from-red-500 to-pink-500",
      skills: ["APIs", "Docker", "Deploy", "DevOps"],
    },
    {
      id: 7,
      title: "Assistente de IA Corporativo",
      description: "Construa um assistente de IA que integra múltiplos serviços e APIs.",
      technologies: ["Python", "LangChain", "FastAPI", "Redis"],
      difficulty: "Avançado",
      duration: "4 semanas",
      icon: "🤖",
      color: "from-yellow-500 to-orange-500",
      skills: ["Agentes de IA", "Integração de APIs", "Orquestração"],
    },
    {
      id: 8,
      title: "Sistema Completo de IA em Produção",
      description: "Implemente um sistema end-to-end com pipeline de dados, modelo e monitoramento.",
      technologies: ["Python", "Airflow", "Docker", "Kubernetes", "Prometheus"],
      difficulty: "Expert",
      duration: "4 semanas",
      icon: "🚀",
      color: "from-teal-500 to-cyan-500",
      skills: ["MLOps", "CI/CD", "Monitoramento", "Escalabilidade"],
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Projetos Práticos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Aplique seus conhecimentos em 8 projetos reais que simulam desafios do mercado.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <a
                  className="group h-full p-6 border border-border rounded-xl bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{project.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6 space-y-3">
                    <p className="text-sm font-semibold text-foreground">Habilidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6 space-y-3">
                    <p className="text-sm font-semibold text-foreground">Tecnologias:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      ⏱️ {project.duration}
                    </div>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-semibold">Explorar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Por que Fazer Projetos?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projetos práticos consolidam seu aprendizado e criam um portfólio impressionante.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 border border-border rounded-xl bg-background text-center space-y-3">
              <div className="text-4xl">💡</div>
              <h3 className="font-semibold">Aprendizado Prático</h3>
              <p className="text-sm text-muted-foreground">
                Aplique conceitos teóricos em cenários reais
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-background text-center space-y-3">
              <div className="text-4xl">📁</div>
              <h3 className="font-semibold">Portfólio</h3>
              <p className="text-sm text-muted-foreground">
                Construa um portfólio impressionante para recrutadores
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-background text-center space-y-3">
              <div className="text-4xl">🎯</div>
              <h3 className="font-semibold">Experiência</h3>
              <p className="text-sm text-muted-foreground">
                Ganhe experiência com ferramentas e tecnologias reais
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-background text-center space-y-3">
              <div className="text-4xl">🚀</div>
              <h3 className="font-semibold">Carreira</h3>
              <p className="text-sm text-muted-foreground">
                Aumente suas chances de conseguir um bom emprego
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Pronto para Começar um Projeto?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha um projeto e comece a construir seu portfólio hoje mesmo.
            </p>
          </div>

          <Link href="/learning-path">
            <a className="btn-primary inline-flex items-center gap-2">
              Voltar para Trilha <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
