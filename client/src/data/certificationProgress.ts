import type { InteractiveCertification } from "./interactiveCertificationCatalog";

export type AnswerHistory = Record<string, Record<number, number>>;

export type CertificationCompletion = {
  completedAt: string;
  correctCount: number;
  scorePercentage: number;
  attempts: number;
};

export type CompletionHistory = Record<string, CertificationCompletion>;

export const PROGRESS_STORAGE_KEY = "ia-academy-interactive-certification-progress";
export const COMPLETION_HISTORY_STORAGE_KEY = "ia-academy-interactive-certification-history";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readAnswerHistory(): AnswerHistory {
  return readStorage<AnswerHistory>(PROGRESS_STORAGE_KEY, {});
}

export function readCompletionHistory(): CompletionHistory {
  return readStorage<CompletionHistory>(COMPLETION_HISTORY_STORAGE_KEY, {});
}

export function getCertificationStats(cert: InteractiveCertification, answers: Record<number, number> = {}) {
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([questionIndex, answer]) => cert.quiz[Number(questionIndex)]?.correctAnswer === answer,
  ).length;

  return {
    answeredCount,
    correctCount,
    completed: answeredCount === cert.quiz.length,
    percentage: cert.quiz.length ? Math.round((answeredCount / cert.quiz.length) * 100) : 0,
    scorePercentage: cert.quiz.length ? Math.round((correctCount / cert.quiz.length) * 100) : 0,
  };
}

export function saveCompletion(certificationId: string, stats: ReturnType<typeof getCertificationStats>) {
  if (typeof window === "undefined") return;
  const history = readCompletionHistory();
  const previous = history[certificationId];
  const nextHistory: CompletionHistory = {
    ...history,
    [certificationId]: {
      completedAt: new Date().toISOString(),
      correctCount: stats.correctCount,
      scorePercentage: stats.scorePercentage,
      attempts: (previous?.attempts ?? 0) + 1,
    },
  };
  window.localStorage.setItem(COMPLETION_HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
}

export function formatCompletionDate(value?: string) {
  if (!value) return "Concluída anteriormente";
  return new Date(value).toLocaleDateString("pt-BR", { dateStyle: "long" });
}
