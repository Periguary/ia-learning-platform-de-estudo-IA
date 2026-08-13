export const phaseEntryRoutes = {
  1: "/course/1/linear-algebra",
  2: "/course/2/python-basics",
  3: "/course/3/sql-basics",
  4: "/course/4/numpy",
  5: "/course/5/ml-fundamentals",
  6: "/course/6/neural-networks",
  7: "/course/7/llms",
  8: "/course/8/software-engineering",
} as const;

export type LearningPhaseId = keyof typeof phaseEntryRoutes;

export function getPhaseEntryRoute(phaseId: number): string {
  return phaseEntryRoutes[phaseId as LearningPhaseId] ?? "/learning-path";
}
