import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const dbMock = vi.hoisted(() => ({
  create: vi.fn(),
  list: vi.fn(),
  evaluate: vi.fn(),
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    createChallengeSubmission: dbMock.create,
    getChallengeSubmissionsForUser: dbMock.list,
    updateChallengeSubmissionEvaluation: dbMock.evaluate,
  };
});

const context = (authenticated = true): TrpcContext => ({
  user: authenticated ? { id: 7, openId: "student", name: "Aluno", email: "student@example.com", loginMethod: "google", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() } : undefined,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("challenges submissions", () => {
  it("exige login para enviar uma solução", async () => {
    const caller = appRouter.createCaller(context(false));
    await expect(caller.challenges.submit({ challengeId: "cv-quality-control", responseText: "Uma solução detalhada" })).rejects.toThrow("Faça login para enviar uma solução.");
    expect(dbMock.create).not.toHaveBeenCalled();
  });

  it("persiste resposta e notebook sem expor o conteúdo ao cliente de avaliação remota", async () => {
    dbMock.create.mockResolvedValue({ id: 12, userId: 7, challengeId: "cv-quality-control", responseText: "Uma solução detalhada", notebookName: "solution.ipynb", notebookContent: "{}", status: "submitted" });
    const caller = appRouter.createCaller(context());
    const result = await caller.challenges.submit({ challengeId: "cv-quality-control", responseText: "Uma solução detalhada", notebookName: "solution.ipynb", notebookContent: "{}" });
    expect(result).toMatchObject({ id: 12, challengeId: "cv-quality-control", status: "submitted" });
    expect(dbMock.create).toHaveBeenCalledWith(expect.objectContaining({ userId: 7, notebookName: "solution.ipynb", notebookContent: "{}" }));
  });

  it("salva a avaliação local e restringe a submissão ao próprio usuário", async () => {
    dbMock.evaluate.mockResolvedValue({ id: 12, userId: 7, status: "evaluated", score: 84, feedback: "Feedback local detalhado" });
    const caller = appRouter.createCaller(context());
    const result = await caller.challenges.saveEvaluation({ submissionId: 12, score: 84, feedback: "Feedback local detalhado com próximos passos." });
    expect(result).toMatchObject({ status: "evaluated", score: 84 });
    expect(dbMock.evaluate).toHaveBeenCalledWith(7, 12, expect.objectContaining({ status: "evaluated", score: 84 }));
  });
});
