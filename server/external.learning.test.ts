import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const schemaSource = readFileSync(new URL("../drizzle/schema.ts", import.meta.url), "utf8");
const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");

describe("external learning progress contract", () => {
  it("keeps user-scoped persistence fields in the schema and helpers", () => {
    expect(schemaSource).toContain('mysqlTable("external_learning_progress"');
    expect(schemaSource).toContain("userId: int(\"userId\")");
    expect(schemaSource).toContain("resourceId: varchar(\"resourceId\"");
    expect(schemaSource).toContain("completedAt: timestamp(\"completedAt\")");
    expect(dbSource).toContain("getExternalLearningProgress");
    expect(dbSource).toContain("toggleExternalLearningProgress");
    expect(dbSource).toContain("eq(externalLearningProgress.userId, userId)");
  });

  it("keeps validated tRPC procedures for listing and toggling completion", () => {
    expect(routerSource).toContain("externalLearning: router({");
    expect(routerSource).toContain("progress: publicProcedure.query");
    expect(routerSource).toContain("toggleProgress: publicProcedure");
    expect(routerSource).toContain("resourceId: z.string().trim().min(1).max(160)");
    expect(routerSource).toContain("completed: z.boolean()");
    expect(routerSource).toContain("Faça login para acompanhar seu progresso.");
  });
});
