import { useRoute } from "wouter";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const [match, params] = useRoute("/course/:phase/:module");

  if (!match) return null;

  const phase = parseInt(params?.phase || "1");
  const module = params?.module || "overview";

  // Mock course data
  const courseData = {
    title: "Álgebra Linear",
    phase: 1,
    module: "linear-algebra",
    description: "Aprenda os fundamentos de Álgebra Linear essenciais para Machine Learning",
    duration: "4 semanas",
    lessons: 12,
    difficulty: "Iniciante",
    rating: 4.8,
    reviews: 234,
    sections: [
      {
        title: "Introdução",
        lessons: [
          { id: 1, title: "O que é Álgebra Linear?", duration: "15 min", completed: false },
          { id: 2, title: "Aplicações em IA", duration: "20 min", completed: false },
          { id: 3, title: "Ferramentas e Bibliotecas", duration: "18 min", completed: false },
        ],
      },
      {
        title: "Vetores",
        lessons: [
          { id: 4, title: "Conceito de Vetor", duration: "25 min", completed: false },
          { id: 5, title: "Operações Vetoriais", duration: "30 min", completed: false },
          { id: 6, title: "Produto Escalar", duration: "28 min", completed: false },
          { id: 7, title: "Produto Vetorial", duration: "25 min", completed: false },
        ],
      },
      {
        title: "Matrizes",
        lessons: [
          { id: 8, title: "Conceito de Matriz", duration: "20 min", completed: false },
          { id: 9, title: "Operações com Matrizes", duration: "35 min", completed: false },
          { id: 10, title: "Determinantes", duration: "30 min", completed: false },
          { id: 11, title: "Matrizes Inversas", duration: "28 min", completed: false },
        ],
      },
      {
        title: "Aplicações Práticas",
        lessons: [
          { id: 12, title: "Projeto: Transformações Lineares", duration: "45 min", completed: false },
        ],
      },
    ],
    content: `
# Álgebra Linear para Machine Learning

## Visão Geral

Álgebra Linear é a matemática que sustenta a maioria dos algoritmos de Machine Learning. 
Neste módulo, você aprenderá os conceitos fundamentais que são essenciais para entender 
como os modelos de IA funcionam.

## O que você aprenderá

- Vetores e operações vetoriais
- Matrizes e suas operações
- Determinantes e matrizes inversas
- Espaços vetoriais e transformações lineares
- Autovalores e autovetores
- Decomposição de matrizes (PCA, SVD)

## Por que é importante?

A Álgebra Linear é fundamental porque:

1. **Representação de Dados**: Dados são representados como vetores e matrizes
2. **Transformações**: Modelos de IA aplicam transformações lineares aos dados
3. **Otimização**: Algoritmos de otimização usam conceitos de Álgebra Linear
4. **Eficiência**: Operações vetorizadas são muito mais rápidas

## Pré-requisitos

- Conhecimento básico de matemática (funções, gráficos)
- Familiaridade com programação em Python (recomendado)

## Estrutura do Módulo

Este módulo é dividido em 4 seções principais:

### 1. Introdução
Comece entendendo o que é Álgebra Linear e por que é importante para IA.

### 2. Vetores
Aprenda sobre vetores, operações vetoriais e produtos escalares.

### 3. Matrizes
Domine operações com matrizes, determinantes e inversas.

### 4. Aplicações Práticas
Aplique seus conhecimentos em projetos práticos.

## Recursos Adicionais

- Notebooks Python com exemplos
- Exercícios interativos
- Projetos práticos
- Links para leitura adicional
    `,
  };

  const totalLessons = courseData.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedLessons = courseData.sections.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <Link href="/learning-path">
            <a className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              Voltar para Trilha
            </a>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                Fase {phase}
              </span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                {courseData.difficulty}
              </span>
            </div>
            <h1 className="text-4xl font-bold">{courseData.title}</h1>
            <p className="text-lg text-muted-foreground">{courseData.description}</p>

            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span>{courseData.lessons} aulas</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{courseData.rating} ({courseData.reviews} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Left: Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="p-6 border border-border rounded-xl bg-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Seu Progresso</h3>
                <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {completedLessons} de {totalLessons} aulas completas
              </p>
            </div>

            {/* Course Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground space-y-6">
                {courseData.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("#")) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1;
                    const text = paragraph.replace(/^#+\s/, "");
                    const headingClass = {
                      1: "text-3xl font-bold",
                      2: "text-2xl font-bold",
                      3: "text-xl font-semibold",
                    }[level] || "text-lg font-semibold";
                    return (
                      <h2 key={`heading-${index}`} className={headingClass}>
                        {text}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("-")) {
                    return (
                      <ul key={`list-${index}`} className="space-y-2 list-disc list-inside text-muted-foreground">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={`item-${index}-${i}`} className="text-muted-foreground">
                            {item.replace(/^-\s/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={`para-${index}`} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Lessons List */}
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-card/50">
                  <h3 className="font-semibold">Aulas</h3>
                </div>

                <div className="divide-y divide-border max-h-96 overflow-y-auto">
                  {courseData.sections.map((section) => (
                    <div key={section.title}>
                      <div className="p-4 bg-muted/30 font-semibold text-sm sticky top-0">
                        {section.title}
                      </div>
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-start gap-3 border-b border-border last:border-b-0"
                        >
                          <div className="pt-1">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted flex-shrink-0"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
              >
                Começar Primeira Aula
              </Button>

              {/* Resources */}
              <div className="p-4 border border-border rounded-xl bg-card space-y-3">
                <h4 className="font-semibold text-sm">Recursos</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    Notas de Aula
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    Exercícios
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    Código Python
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
