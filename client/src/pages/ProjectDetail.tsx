import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, Code2, BookOpen, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");

  if (!match) return null;

  const projectId = parseInt(params?.id || "1");

  const projectsData: Record<number, any> = {
    1: {
      title: "Previsão de Vendas",
      description: "Crie um modelo de regressão para prever vendas futuras usando dados históricos.",
      difficulty: "Intermediário",
      duration: "2 semanas",
      icon: "📈",
      color: "from-blue-500 to-cyan-500",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      skills: ["Regressão Linear", "Feature Engineering", "Validação Cruzada"],
      overview: `
Este projeto envolve a construção de um modelo de machine learning para prever vendas futuras.
Você trabalhará com dados históricos de vendas, realizará análise exploratória, engenharia de features
e treinará um modelo de regressão.
      `,
      objectives: [
        "Carregar e explorar dados de vendas",
        "Realizar análise exploratória de dados (EDA)",
        "Engenharia de features e pré-processamento",
        "Treinar modelo de regressão linear",
        "Avaliar modelo com métricas apropriadas",
        "Fazer previsões em novos dados",
      ],
      requirements: [
        "Python 3.8+",
        "Pandas para manipulação de dados",
        "Scikit-learn para ML",
        "Matplotlib/Seaborn para visualização",
        "Jupyter Notebook (recomendado)",
      ],
      steps: [
        {
          number: 1,
          title: "Setup do Ambiente",
          description: "Configure seu ambiente Python com as bibliotecas necessárias.",
          code: `
pip install pandas scikit-learn matplotlib seaborn jupyter numpy
          `,
        },
        {
          number: 2,
          title: "Carregar Dados",
          description: "Importe e explore o dataset de vendas.",
          code: `
import pandas as pd
import numpy as np

# Carregar dados
df = pd.read_csv('sales_data.csv')

# Explorar estrutura
print(df.head())
print(df.info())
print(df.describe())
          `,
        },
        {
          number: 3,
          title: "Análise Exploratória",
          description: "Visualize e entenda os padrões nos dados.",
          code: `
import matplotlib.pyplot as plt

# Distribuição de vendas
plt.hist(df['sales'], bins=30)
plt.xlabel('Vendas')
plt.ylabel('Frequência')
plt.show()

# Correlação entre features
df.corr()
          `,
        },
        {
          number: 4,
          title: "Preparação de Dados",
          description: "Limpe e prepare os dados para o modelo.",
          code: `
# Remover valores nulos
df = df.dropna()

# Separar features e target
X = df.drop('sales', axis=1)
y = df['sales']

# Dividir em treino e teste
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
          `,
        },
        {
          number: 5,
          title: "Treinar Modelo",
          description: "Treine um modelo de regressão linear.",
          code: `
from sklearn.linear_model import LinearRegression

# Criar e treinar modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Avaliar
from sklearn.metrics import mean_squared_error, r2_score
y_pred = model.predict(X_test)
print(f'R² Score: {r2_score(y_test, y_pred)}')
print(f'RMSE: {np.sqrt(mean_squared_error(y_test, y_pred))}')
          `,
        },
        {
          number: 6,
          title: "Melhorias",
          description: "Experimente técnicas avançadas para melhorar o modelo.",
          code: `
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor

# Normalizar features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Tentar Random Forest
rf_model = RandomForestRegressor(n_estimators=100)
rf_model.fit(X_train_scaled, y_train)
          `,
        },
      ],
      improvements: [
        "Usar algoritmos mais avançados (Random Forest, XGBoost)",
        "Implementar validação cruzada",
        "Fazer feature selection mais rigorosa",
        "Testar diferentes estratégias de normalização",
        "Implementar ensemble de modelos",
      ],
      resources: [
        { title: "Dataset de Vendas", url: "#" },
        { title: "Documentação Scikit-learn", url: "https://scikit-learn.org" },
        { title: "Guia de Regressão", url: "#" },
      ],
    },
  };

  const project = projectsData[projectId] || projectsData[1];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <Link href="/projects">
            <a className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              Voltar para Projetos
            </a>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{project.icon}</span>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white mb-3`}>
                  {project.difficulty}
                </span>
                <h1 className="text-4xl font-bold">{project.title}</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              <span>⏱️ {project.duration}</span>
              <span>🛠️ {project.technologies.join(", ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Left: Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Visão Geral</h2>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </section>

            {/* Objectives */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Objetivos</h2>
              <ul className="space-y-3">
                {project.objectives.map((objective: string, index: number) => (
                  <li key={`obj-${index}`} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Requisitos</h2>
              <div className="p-6 border border-border rounded-xl bg-card space-y-3">
                {project.requirements.map((req: string, index: number) => (
                  <div key={`req-${index}`} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Step by Step */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Guia Passo a Passo</h2>
              {project.steps.map((step: any, index: number) => (
                <div key={`step-${index}`} className="border border-border rounded-xl bg-card p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-muted-foreground">
                      <code>{step.code.trim()}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </section>

            {/* Improvements */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Melhorias Possíveis</h2>
              <ul className="space-y-2">
                {project.improvements.map((improvement: string, index: number) => (
                  <li key={`imp-${index}`} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-primary">→</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Technologies */}
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h3 className="font-semibold">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h3 className="font-semibold">Habilidades</h3>
                <div className="space-y-2">
                  {project.skills.map((skill: string) => (
                    <div key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="p-6 border border-border rounded-xl bg-card space-y-4">
                <h3 className="font-semibold">Recursos</h3>
                <div className="space-y-3">
                  {project.resources.map((resource: any, index: number) => (
                    <a
                      key={`res-${index}`}
                      href={resource.url}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-sm text-primary hover:text-primary/80"
                    >
                      <span>{resource.title}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Começar Projeto
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-border hover:bg-muted"
              >
                <Github className="w-5 h-5 mr-2" />
                Ver Código
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
