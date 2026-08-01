import { useLocation, useRoute } from "wouter";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Star, ExternalLink, FileText, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { coursesData, lessonsContentData } from "@/data/coursesData";

export default function CourseDetail() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/course/:phase/:module");
  const [selectedLesson, setSelectedLesson] = useState<number | string | null>(1);

  if (!match) return null;

  const module = params?.module ? String(params.module).toLowerCase().trim() : "linear-algebra";
  const courseData = coursesData[module];
  const lessonsContent = lessonsContentData[module] || {};

  if (!courseData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Curso não encontrado</h1>
          <button
            onClick={() => navigate("/learning-path")}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Voltar para Trilha
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = courseData.sections.reduce((acc: number, s: any) => acc + s.lessons.length, 0);
  const completedLessons = courseData.sections.reduce(
    (acc: number, s: any) => acc + s.lessons.filter((l: any) => l.completed).length,
    0
  );
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  // Recursos adicionais
  const additionalResources = [
    {
      id: "notebooks",
      title: "Notebooks Python com Exemplos",
      description: "Exemplos práticos implementados em Jupyter Notebooks",
      icon: Code,
    },
    {
      id: "exercises",
      title: "Exercícios Interativos",
      description: "Exercícios para consolidar o aprendizado",
      icon: Lightbulb,
    },
    {
      id: "projects",
      title: "Projetos Práticos",
      description: "Projetos completos para aplicar conhecimento",
      icon: FileText,
    },
    {
      id: "references",
      title: "Referências e Leitura Adicional",
      description: "Livros, artigos e recursos recomendados",
      icon: BookOpen,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container">
          <button
            onClick={() => navigate("/learning-path")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Trilha
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                Fase {courseData.phase}
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

            {/* Progress Bar */}
            <div className="space-y-2 pt-4">
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
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 border-b border-border">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Left: Lessons Content */}
          <div className="lg:col-span-2">
            {selectedLesson != null && lessonsContent[selectedLesson] != null ? (
              // Show lesson content
              <div className="p-6 border border-border rounded-xl bg-card space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{lessonsContent[selectedLesson].title}</h2>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-w-none">
                  <div className="text-foreground space-y-4 whitespace-pre-wrap text-sm leading-relaxed">
                    {lessonsContent[selectedLesson].content}
                  </div>
                </div>

                {lessonsContent[selectedLesson]?.examples && lessonsContent[selectedLesson].examples!.length > 0 && (
                  <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm">Exemplos Práticos:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {lessonsContent[selectedLesson].examples!.map((example: string, idx: number) => (
                        <li key={`example-${idx}`} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button className="flex-1" variant="default">
                    Marcar como Concluída
                  </Button>
                  <Button className="flex-1" variant="outline">
                    Próxima Aula
                  </Button>
                </div>
              </div>
            ) : (
              // Show course overview
              <>
                <div className="prose prose-invert max-w-none">
                  <div className="text-foreground space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Visão Geral do Curso</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {courseData.description}. Este módulo é essencial para sua jornada em IA e ciência de dados.
                        Você aprenderá conceitos fundamentais, práticas recomendadas e aplicações reais.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">O que você aprenderá</h3>
                      <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                        <li>Conceitos fundamentais do módulo</li>
                        <li>Aplicações práticas em IA</li>
                        <li>Implementação com Python</li>
                        <li>Resolução de problemas reais</li>
                        <li>Melhores práticas da indústria</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Por que é importante?</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Este conhecimento é fundamental para construir modelos de IA eficazes. Você usará esses
                        conceitos em praticamente todos os projetos de ciência de dados e machine learning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resources Section */}
                <div className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold">Recursos Adicionais</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {additionalResources.map((resource) => {
                      const IconComponent = resource.icon;
                      return (
                        <button
                          key={`resource-${resource.id}`}
                          onClick={() => setSelectedLesson(resource.id)}
                          className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors text-left group nav-button"
                        >
                          <div className="flex items-start gap-3">
                            <IconComponent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <div className="flex items-center gap-2 mt-3 text-primary text-sm">
                                Acessar <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
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
                  {courseData.sections.map((section: any) => (
                    <div key={`section-${section.title}`}>
                      <div className="p-4 bg-muted/30 font-semibold text-sm sticky top-0">
                        {section.title}
                      </div>
                      {section.lessons.map((lesson: any) => (
                        <button
                          key={`lesson-${lesson.id}`}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={`w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-start gap-3 border-b border-border last:border-b-0 bg-transparent border-none cursor-pointer ${
                            selectedLesson === lesson.id ? "bg-muted/50 border-l-2 border-l-primary" : ""
                          }`}
                        >
                          <div className="pt-1">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="border border-border rounded-xl bg-card p-4 space-y-3">
                <h4 className="font-semibold text-sm">Próximos Passos</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">1.</span>
                    <span>Complete todas as aulas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">2.</span>
                    <span>Resolva os exercícios</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">3.</span>
                    <span>Implemente o projeto</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">4.</span>
                    <span>Obtenha o certificado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
