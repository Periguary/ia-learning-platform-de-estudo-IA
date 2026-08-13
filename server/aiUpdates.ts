import { invokeLLM } from "./_core/llm";
import {
  createAIUpdateCandidate,
  findAIUpdateCandidate,
} from "./db";

export const AI_UPDATE_SOURCES = [
  { name: "OpenAI News", url: "https://openai.com/news/" },
  { name: "Google DeepMind", url: "https://deepmind.google/blog/" },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog" },
  { name: "NIST AI RMF", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
] as const;

const stripMarkup = (html: string) => html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, 14_000);

const candidateSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 8, maxLength: 300 },
    summary: { type: "string", minLength: 30, maxLength: 700 },
    category: { type: "string", enum: ["Modelos", "Agentes", "Open Source", "Segurança", "Pesquisa"] },
    relatedModules: { type: "array", items: { type: "string", enum: ["llms", "neural-networks", "software-engineering", "ml-fundamentals"] }, minItems: 1, maxItems: 3 },
    learningAction: { type: "string", minLength: 30, maxLength: 500 },
    publishedAt: { type: ["string", "null"] },
  },
  required: ["title", "summary", "category", "relatedModules", "learningAction", "publishedAt"],
  additionalProperties: false,
};

function parseCandidate(content: string) {
  const parsed = JSON.parse(content) as {
    title: string;
    summary: string;
    category: "Modelos" | "Agentes" | "Open Source" | "Segurança" | "Pesquisa";
    relatedModules: string[];
    learningAction: string;
    publishedAt: string | null;
  };
  if (!parsed.title || !parsed.summary || !parsed.learningAction || parsed.relatedModules.length === 0) {
    throw new Error("Candidate response is incomplete");
  }
  return parsed;
}

export async function curateAIUpdates() {
  const results = { scanned: 0, created: 0, skipped: 0, failed: 0 };

  for (const source of AI_UPDATE_SOURCES) {
    results.scanned += 1;
    try {
      const response = await fetch(source.url, {
        headers: { "User-Agent": "IA-Academy-Curator/1.0" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error(`Source returned ${response.status}`);
      const sourceText = stripMarkup(await response.text());
      if (sourceText.length < 200) throw new Error("Source content is too short");

      const generated = await invokeLLM({
        model: "gpt-5-mini",
        maxTokens: 900,
        messages: [
          {
            role: "system",
            content: "Você é um curador editorial de uma plataforma brasileira de educação em IA. Extraia apenas uma atualização verificável do texto da fonte. Não invente números, datas, links, benchmarks ou promessas. Se o conteúdo não trouxer uma novidade didaticamente útil, ainda assim selecione o item mais claro da página e explique como estudá-lo. Use somente os moduleIds permitidos no schema. Retorne JSON estrito.",
          },
          {
            role: "user",
            content: `Fonte: ${source.name}\nURL: ${source.url}\nConteúdo extraído:\n${sourceText}`,
          },
        ],
        responseFormat: {
          type: "json_schema",
          json_schema: {
            name: "ai_update_candidate",
            strict: true,
            schema: candidateSchema,
          },
        },
      });

      const content = generated.choices[0]?.message?.content;
      if (typeof content !== "string") throw new Error("Curator returned no JSON text");
      const candidate = parseCandidate(content);
      if (await findAIUpdateCandidate(source.url, candidate.title)) {
        results.skipped += 1;
        continue;
      }

      await createAIUpdateCandidate({
        sourceUrl: source.url,
        sourceName: source.name,
        title: candidate.title,
        summary: candidate.summary,
        category: candidate.category,
        relatedModules: JSON.stringify(candidate.relatedModules),
        learningAction: candidate.learningAction,
        publishedAt: candidate.publishedAt ? new Date(candidate.publishedAt) : null,
        status: "pending",
      });
      results.created += 1;
    } catch (error) {
      console.warn(`[AI Curator] Failed to process ${source.url}:`, error);
      results.failed += 1;
    }
  }

  return results;
}
