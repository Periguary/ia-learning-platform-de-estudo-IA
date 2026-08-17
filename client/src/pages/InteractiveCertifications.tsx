import React, { useEffect, useMemo, useState } from "react";
import { interactiveCertificationsCatalog, InteractiveCertification } from "@/data/interactiveCertificationCatalog";
import { Award, ArrowRight, CheckCircle2, ExternalLink, Filter, Linkedin, RotateCcw, Search, ShieldCheck, Trophy, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

type AnswerHistory = Record<string, Record<number, number>>;

const PROGRESS_STORAGE_KEY = "ia-academy-interactive-certification-progress";

function readAnswerHistory(): AnswerHistory {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AnswerHistory) : {};
  } catch {
    return {};
  }
}

function getCertificationStats(cert: InteractiveCertification, answers: Record<number, number> = {}) {
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([questionIndex, answer]) => cert.quiz[Number(questionIndex)]?.correctAnswer === answer,
  ).length;
  return {
    answeredCount,
    correctCount,
    completed: answeredCount === cert.quiz.length,
    percentage: Math.round((answeredCount / cert.quiz.length) * 100),
    scorePercentage: cert.quiz.length ? Math.round((correctCount / cert.quiz.length) * 100) : 0,
  };
}

export default function InteractiveCertifications() {
  const [selectedCert, setSelectedCert] = useState<InteractiveCertification>(interactiveCertificationsCatalog[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory>(() => readAnswerHistory());
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("todos");
  const [issuerFilter, setIssuerFilter] = useState("todos");

  const selectedAnswers = answerHistory[selectedCert.id] ?? {};
  const currentQuestion = selectedCert.quiz[currentQuestionIndex];
  const selectedStats = getCertificationStats(selectedCert, selectedAnswers);

  const issuers = useMemo(() => Array.from(new Set(interactiveCertificationsCatalog.map(cert => cert.issuer))), []);
  const filteredCertifications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    return interactiveCertificationsCatalog.filter(cert => {
      const matchesSearch = !normalizedSearch || [cert.title, cert.issuer, cert.description, ...cert.skillsCovered]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedSearch);
      const matchesLevel = levelFilter === "todos" || cert.level === levelFilter;
      const matchesIssuer = issuerFilter === "todos" || cert.issuer === issuerFilter;
      return matchesSearch && matchesLevel && matchesIssuer;
    });
  }, [issuerFilter, levelFilter, searchTerm]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(answerHistory));
    } catch {
      // O progresso continua disponível na sessão caso o navegador bloqueie o armazenamento.
    }
  }, [answerHistory]);

  useEffect(() => {
    if (filteredCertifications.length > 0 && !filteredCertifications.some(cert => cert.id === selectedCert.id)) {
      setSelectedCert(filteredCertifications[0]);
      setCurrentQuestionIndex(0);
      setShowResults(false);
    }
  }, [filteredCertifications, selectedCert.id]);

  const handleSelectOption = (optionIndex: number) => {
    setAnswerHistory(prev => ({
      ...prev,
      [selectedCert.id]: {
        ...(prev[selectedCert.id] ?? {}),
        [currentQuestionIndex]: optionIndex,
      },
    }));
    setShowResults(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedCert.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setAnswerHistory(prev => ({ ...prev, [selectedCert.id]: {} }));
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const handleSelectCertification = (cert: InteractiveCertification) => {
    setSelectedCert(cert);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const completedCount = interactiveCertificationsCatalog.filter(cert => getCertificationStats(cert, answerHistory[cert.id]).completed).length;
  const perfectCount = interactiveCertificationsCatalog.filter(cert => {
    const stats = getCertificationStats(cert, answerHistory[cert.id]);
    return stats.completed && stats.scorePercentage === 100;
  }).length;
  const badges = [
    { id: "first", label: "Primeira Conquista", description: "Conclua seu primeiro simulador", unlocked: completedCount >= 1 },
    { id: "perfect", label: "Aproveitamento Excelente", description: "Acerte todas as questões de um simulador", unlocked: perfectCount >= 1 },
    { id: "specialist", label: "Especialista em IA", description: "Conclua todas as certificações disponíveis", unlocked: completedCount === interactiveCertificationsCatalog.length },
  ];
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://ialearnhub-ndm4gtgm.manus.space/interactive-certifications";
  const shareText = `Concluí o simulador ${selectedCert.title} na IA Academy com ${selectedStats.scorePercentage}% de aproveitamento.`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="container py-12 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-sm text-primary font-medium">
          <Award className="size-4" /> Módulo de Certificação Interativa IA Academy
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Simuladores Oficiais de Certificações em IA</h1>
        <p className="text-lg text-muted-foreground">
          Prepare-se para certificações de IA com trilhas curtas, progresso persistente e feedback imediato. O simulador é uma ferramenta de estudo e não substitui o exame oficial do provedor.
        </p>
      </div>

      <section aria-labelledby="progress-heading" className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Minha evolução</p>
            <h2 id="progress-heading" className="text-2xl font-bold">Avance por evidências, não por pressa</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{completedCount} de {interactiveCertificationsCatalog.length} concluídas</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {interactiveCertificationsCatalog.map(cert => {
            const stats = getCertificationStats(cert, answerHistory[cert.id]);
            return (
              <button type="button" key={cert.id} onClick={() => handleSelectCertification(cert)} className="rounded-2xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/60">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold line-clamp-2">{cert.title}</span>
                  {stats.completed ? <CheckCircle2 aria-label="Concluída" className="size-5 shrink-0 text-emerald-400" /> : <span className="text-xs text-muted-foreground">{stats.answeredCount}/{cert.quiz.length}</span>}
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-label={`${stats.percentage}% concluído`}>
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-300" style={{ width: `${stats.percentage}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{stats.completed ? `${stats.scorePercentage}% de aproveitamento` : `${stats.percentage}% do simulado respondido`}</p>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3" aria-label="Medalhas de progresso">
          {badges.map(badge => (
            <div key={badge.id} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${badge.unlocked ? "border-amber-400/40 bg-amber-400/10" : "border-border bg-background opacity-60"}`}>
              <Trophy className={`size-5 ${badge.unlocked ? "text-amber-300" : "text-muted-foreground"}`} />
              <div><p className="text-sm font-semibold">{badge.label}</p><p className="text-xs text-muted-foreground">{badge.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <aside className="space-y-4" aria-label="Busca e filtros de certificações">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Trilhas Certificadas</h2><span className="text-xs text-muted-foreground">{filteredCertifications.length} resultados</span></div>
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
            <label className="relative block"><span className="sr-only">Buscar certificação, provedor ou habilidade</span><Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Buscar certificação ou habilidade" className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary" /></label>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><Filter className="size-3.5" /> Filtrar catálogo</div>
            <label className="block text-xs font-medium text-muted-foreground">Nível<select aria-label="Filtrar por nível" value={levelFilter} onChange={event => setLevelFilter(event.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"><option value="todos">Todos os níveis</option><option value="Iniciante">Iniciante</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option><option value="Especialista">Especialista</option></select></label>
            <label className="block text-xs font-medium text-muted-foreground">Provedor<select aria-label="Filtrar por provedor" value={issuerFilter} onChange={event => setIssuerFilter(event.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"><option value="todos">Todos os provedores</option>{issuers.map(issuer => <option key={issuer} value={issuer}>{issuer}</option>)}</select></label>
            {(searchTerm || levelFilter !== "todos" || issuerFilter !== "todos") && <Button type="button" variant="outline" size="sm" onClick={() => { setSearchTerm(""); setLevelFilter("todos"); setIssuerFilter("todos"); }} className="w-full">Limpar filtros</Button>}
          </div>
          {filteredCertifications.length === 0 ? <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Nenhuma certificação corresponde aos filtros atuais.</div> : filteredCertifications.map(cert => {
            const stats = getCertificationStats(cert, answerHistory[cert.id]);
            return <button type="button" key={cert.id} onClick={() => handleSelectCertification(cert)} className={`w-full cursor-pointer rounded-2xl border p-5 text-left transition-all space-y-3 ${selectedCert.id === cert.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/50"}`}><div className="flex items-center justify-between"><span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">{cert.level}</span><span className="text-xs text-muted-foreground flex items-center gap-1"><Trophy className="size-3.5 text-amber-400" /> {cert.durationHours}h est.</span></div><h3 className="font-bold text-lg">{cert.title}</h3><p className="text-xs text-muted-foreground line-clamp-2">{cert.description}</p><div className="flex items-center justify-between text-xs font-semibold text-primary"><span>Emitido por {cert.issuer}</span><span>{stats.percentage}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${stats.percentage}%` }} /></div></button>;
          })}
        </aside>

        <main className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6"><div><span className="text-xs font-semibold uppercase tracking-wider text-primary">{selectedCert.issuer}</span><h2 className="text-2xl font-bold tracking-tight">{selectedCert.title}</h2></div><a href={selectedCert.officialExamUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Exame Oficial <ExternalLink className="size-4" /></a></div>
            <div className="space-y-4"><h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Habilidades Validadas</h3><div className="flex flex-wrap gap-2">{selectedCert.skillsCovered.map(skill => <span key={skill} className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium">{skill}</span>)}</div></div>
            <div className="rounded-2xl border border-primary/20 bg-background p-6 space-y-6"><div className="flex items-center justify-between"><span className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck className="size-5" /> Simulador Prático de Exame</span>{!showResults && <span className="text-xs text-muted-foreground">Questão {currentQuestionIndex + 1} de {selectedCert.quiz.length}</span>}</div>
              {!showResults ? <div className="space-y-6"><h4 className="text-lg font-semibold">{currentQuestion.question}</h4><div className="space-y-3">{currentQuestion.options.map((option, optIdx) => { const isSelected = selectedAnswers[currentQuestionIndex] === optIdx; return <button key={option} type="button" onClick={() => handleSelectOption(optIdx)} className={`w-full text-left rounded-xl border p-4 transition-all text-sm font-medium flex items-center justify-between ${isSelected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:bg-secondary/50 text-muted-foreground"}`}><span>{option}</span><span className={`size-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{isSelected && <span className="size-2 rounded-full bg-white" />}</span></button>; })}</div><div className="flex justify-between gap-3 pt-4"><span className="text-xs text-muted-foreground self-center">{selectedStats.percentage}% do caminho concluído</span><Button type="button" onClick={handleNext} disabled={selectedAnswers[currentQuestionIndex] === undefined} className="gap-2">{currentQuestionIndex === selectedCert.quiz.length - 1 ? "Ver Resultado" : "Próxima Questão"} <ArrowRight className="size-4" /></Button></div></div> : <div className="space-y-6 text-center py-6"><div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-2"><CheckCircle2 className="size-8" /></div><h4 className="text-2xl font-bold">Simulado Concluído!</h4><p className="text-muted-foreground max-w-md mx-auto">Você acertou <strong className="text-foreground">{selectedStats.correctCount}</strong> de <strong className="text-foreground">{selectedCert.quiz.length}</strong> questões ({selectedStats.scorePercentage}%).</p><div className="flex flex-wrap justify-center gap-3"><Button type="button" onClick={handleReset} variant="outline" className="gap-2"><RotateCcw className="size-4" /> Refazer Simulador</Button><a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"><Linkedin className="size-4" /> LinkedIn</a><a href={twitterUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"><Twitter className="size-4" /> X/Twitter</a></div></div>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
