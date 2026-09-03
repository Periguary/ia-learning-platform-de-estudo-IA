import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const schemaSource = readFileSync(new URL("../drizzle/schema.ts", import.meta.url), "utf8");
const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
const pageSource = readFileSync(new URL("../client/src/pages/Support.tsx", import.meta.url), "utf8");

describe("monetization interest contract", () => {
  it("keeps only the minimum lead fields and explicit consent", () => {
    expect(schemaSource).toContain('mysqlTable("monetization_leads"');
    expect(schemaSource).toContain('email: varchar("email"');
    expect(schemaSource).toContain('consent: int("consent")');
    expect(dbSource).toContain("createMonetizationLead");
    expect(dbSource).toContain("toLowerCase()");
  });

  it("requires validated interest and consent in the public procedure", () => {
    expect(routerSource).toContain("monetization: router({");
    expect(routerSource).toContain("submitInterest: publicProcedure");
    expect(routerSource).toContain('consent: z.literal(true)');
    expect(routerSource).toContain("notifyOwner");
  });

  it("communicates free access and does not promise income", () => {
    expect(pageSource).toContain("não há cobrança automática");
    expect(pageSource).toContain("não existe promessa de renda ou emprego");
    expect(pageSource).toContain("conteúdo gratuito");
  });
});
