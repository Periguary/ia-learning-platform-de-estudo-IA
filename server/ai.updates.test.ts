import { describe, expect, it, beforeEach, vi } from "vitest";

const dbMock = vi.hoisted(() => ({
  getApprovedAIUpdateCandidates: vi.fn(),
  getPendingAIUpdateCandidates: vi.fn(),
  updateAIUpdateCandidateStatus: vi.fn(),
  saveAIConversation: vi.fn(),
  getAIConversationsForUserAndModule: vi.fn(),
  clearAIConversationsForUserAndModule: vi.fn(),
  getUserAIUpdateFavorites: vi.fn(),
  toggleAIUpdateFavorite: vi.fn(),
}));

const curatorMock = vi.hoisted(() => ({
  curateAIUpdates: vi.fn(),
}));

vi.mock("./db", () => dbMock);
vi.mock("./aiUpdates", () => curatorMock);
vi.mock("./_core/llm", () => ({ invokeLLM: vi.fn() }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const createContext = (user?: TrpcContext["user"]): TrpcContext => ({
  user,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("ai updates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMock.getApprovedAIUpdateCandidates.mockResolvedValue([]);
    dbMock.getPendingAIUpdateCandidates.mockResolvedValue([]);
    dbMock.updateAIUpdateCandidateStatus.mockResolvedValue(undefined);
    dbMock.getUserAIUpdateFavorites.mockResolvedValue([]);
    dbMock.toggleAIUpdateFavorite.mockResolvedValue(true);
    curatorMock.curateAIUpdates.mockResolvedValue({ scanned: 4, created: 2, skipped: 1, failed: 1 });
  });

  it("retorna somente candidatos aprovados na consulta pública", async () => {
    dbMock.getApprovedAIUpdateCandidates.mockResolvedValue([
      {
        id: 1,
        title: "Atualização revisada",
        status: "approved",
        sourceUrl: "https://example.com/source",
      },
    ]);

    const result = await appRouter.createCaller(createContext()).ai.updates();

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("approved");
    expect(dbMock.getApprovedAIUpdateCandidates).toHaveBeenCalledOnce();
  });

  it("bloqueia a fila de revisão para usuários que não são administradores", async () => {
    const caller = appRouter.createCaller(createContext({
      id: 2,
      openId: "student",
      name: "Aluno",
      email: "student@example.com",
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));

    await expect(caller.ai.pendingUpdates()).rejects.toThrow();
    expect(dbMock.getPendingAIUpdateCandidates).not.toHaveBeenCalled();
  });

  it("lista e alterna favoritos para um aluno autenticado", async () => {
    dbMock.getUserAIUpdateFavorites.mockResolvedValue(["opencv-ai-competition-2026"]);
    const caller = appRouter.createCaller(createContext({
      id: 2,
      openId: "student",
      name: "Aluno",
      email: "student@example.com",
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));

    const favorites = await caller.ai.updateFavorites();
    const toggled = await caller.ai.toggleUpdateFavorite({ updateKey: "opencv-ai-competition-2026" });

    expect(favorites).toEqual(["opencv-ai-competition-2026"]);
    expect(toggled).toEqual({ isFavorited: true });
    expect(dbMock.toggleAIUpdateFavorite).toHaveBeenCalledWith(2, "opencv-ai-competition-2026");
  });

  it("executa a curadoria e permite aprovação apenas ao administrador", async () => {
    const caller = appRouter.createCaller(createContext({
      id: 1,
      openId: "owner",
      name: "Owner",
      email: "owner@example.com",
      loginMethod: "test",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));

    const refresh = await caller.ai.refreshUpdates();
    await caller.ai.reviewUpdate({ id: 8, status: "approved" });

    expect(refresh).toEqual({ scanned: 4, created: 2, skipped: 1, failed: 1 });
    expect(curatorMock.curateAIUpdates).toHaveBeenCalledOnce();
    expect(dbMock.updateAIUpdateCandidateStatus).toHaveBeenCalledWith(8, "approved");
  });
});
