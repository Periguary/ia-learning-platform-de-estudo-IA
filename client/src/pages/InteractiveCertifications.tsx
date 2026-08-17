import React, { useState } from "react";
import { interactiveCertificationsCatalog, InteractiveCertification } from "@/data/interactiveCertificationCatalog";
import { Award, CheckCircle2, ExternalLink, HelpCircle, ShieldCheck, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InteractiveCertifications() {
  const [selectedCert, setSelectedCert] = useState<InteractiveCertification>(interactiveCertificationsCatalog[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = selectedCert.quiz[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedCert.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const correctCount = Object.entries(selectedAnswers).filter(
    ([idx, ans]) => selectedCert.quiz[Number(idx)].correctAnswer === ans
  ).length;

  return (
    <div className="container py-12 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-sm text-primary font-medium">
          <Award className="size-4" /> Módulo de Certificação Interativa IA Academy
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Simuladores Oficiais de Certificações em IA</h1>
        <p className="text-lg text-muted-foreground">
          Prepare-se para as certificações mais valorizadas do mercado global de Inteligência Artificial. Estude os tópicos essenciais e teste seus conhecimentos com nosso simulador interativo baseado em cenários reais de engenharia.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de Certificações */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Trilhas Certificadas</h2>
          {interactiveCertificationsCatalog.map(cert => (
            <div
              key={cert.id}
              onClick={() => {
                setSelectedCert(cert);
                handleReset();
              }}
              className={`cursor-pointer rounded-2xl border p-5 transition-all space-y-3 ${
                selectedCert.id === cert.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  {cert.level}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Trophy className="size-3.5 text-amber-400" /> {cert.durationHours}h est.
                </span>
              </div>
              <h3 className="font-bold text-lg">{cert.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{cert.description}</p>
              <div className="text-xs font-semibold text-primary">Emitido por {cert.issuer}</div>
            </div>
          ))}
        </div>

        {/* Detalhes e Simulador */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{selectedCert.issuer}</span>
                <h2 className="text-2xl font-bold tracking-tight">{selectedCert.title}</h2>
              </div>
              <a
                href={selectedCert.officialExamUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Exame Oficial <ExternalLink className="size-4" />
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Habilidades Validadas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skillsCovered.map(skill => (
                  <span key={skill} className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulador de Quiz */}
            <div className="rounded-2xl border border-primary/20 bg-background p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <ShieldCheck className="size-5" /> Simulador Prático de Exame
                </span>
                {!showResults && (
                  <span className="text-xs text-muted-foreground">
                    Questão {currentQuestionIndex + 1} de {selectedCert.quiz.length}
                  </span>
                )}
              </div>

              {!showResults ? (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold">{currentQuestion.question}</h4>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left rounded-xl border p-4 transition-all text-sm font-medium flex items-center justify-between ${
                            isSelected
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border bg-card hover:bg-secondary/50 text-muted-foreground"
                          }`}
                        >
                          <span>{option}</span>
                          <div className={`size-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                            {isSelected && <div className="size-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="gap-2"
                    >
                      {currentQuestionIndex === selectedCert.quiz.length - 1 ? "Ver Resultado" : "Próxima Questão"} <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center py-6">
                  <div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h4 className="text-2xl font-bold">Simulado Concluído!</h4>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Você acertou <strong className="text-foreground">{correctCount}</strong> de <strong className="text-foreground">{selectedCert.quiz.length}</strong> questões propostas para esta certificação.
                  </p>
                  <div className="flex justify-center gap-4 pt-4">
                    <Button onClick={handleReset} variant="outline" className="gap-2">
                      <RotateCcw className="size-4" /> Refazer Simulador
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
