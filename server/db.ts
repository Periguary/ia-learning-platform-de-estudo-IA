import { drizzle } from "drizzle-orm/mysql2";
import { eq, desc, and } from "drizzle-orm";
import { InsertUser, users, aiConversations, AIConversation, InsertAIConversation, aiUpdateCandidates, AIUpdateCandidate, InsertAIUpdateCandidate, videoNotes, savedExplanations, studentMemories, studyPlans, notionSyncConfigs, externalCalendarEvents } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.




export async function saveAIConversation(data: InsertAIConversation): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(aiConversations).values(data);
  } catch (error) {
    console.warn("[Database] Failed to save AI conversation:", error);
  }
}

export async function getAIConversationsForUserAndModule(userId: number, moduleId: string): Promise<AIConversation[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db
      .select()
      .from(aiConversations)
      .where(and(eq(aiConversations.userId, userId), eq(aiConversations.moduleId, moduleId)))
      .orderBy(desc(aiConversations.createdAt))
      .limit(10);
  } catch (error) {
    console.warn("[Database] Failed to fetch AI conversations:", error);
    return [];
  }
}


export async function createAIUpdateCandidate(data: InsertAIUpdateCandidate): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(aiUpdateCandidates).values(data);
  } catch (error) {
    console.warn("[Database] Failed to save AI update candidate:", error);
  }
}

export async function findAIUpdateCandidate(sourceUrl: string, title: string): Promise<AIUpdateCandidate | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const rows = await db
      .select()
      .from(aiUpdateCandidates)
      .where(and(eq(aiUpdateCandidates.sourceUrl, sourceUrl), eq(aiUpdateCandidates.title, title)))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.warn("[Database] Failed to find AI update candidate:", error);
    return null;
  }
}

export async function getApprovedAIUpdateCandidates(): Promise<AIUpdateCandidate[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db
      .select()
      .from(aiUpdateCandidates)
      .where(eq(aiUpdateCandidates.status, "approved"))
      .orderBy(desc(aiUpdateCandidates.publishedAt), desc(aiUpdateCandidates.createdAt))
      .limit(30);
  } catch (error) {
    console.warn("[Database] Failed to fetch approved AI updates:", error);
    return [];
  }
}

export async function getPendingAIUpdateCandidates(): Promise<AIUpdateCandidate[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db
      .select()
      .from(aiUpdateCandidates)
      .where(eq(aiUpdateCandidates.status, "pending"))
      .orderBy(desc(aiUpdateCandidates.createdAt))
      .limit(30);
  } catch (error) {
    console.warn("[Database] Failed to fetch pending AI updates:", error);
    return [];
  }
}

export async function updateAIUpdateCandidateStatus(id: number, status: "approved" | "rejected"): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(aiUpdateCandidates).set({ status }).where(eq(aiUpdateCandidates.id, id));
  } catch (error) {
    console.warn("[Database] Failed to update AI update candidate:", error);
  }
}

export async function clearAIConversationsForUserAndModule(userId: number, moduleId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db
      .delete(aiConversations)
      .where(and(eq(aiConversations.userId, userId), eq(aiConversations.moduleId, moduleId)));
  } catch (error) {
    console.warn("[Database] Failed to clear AI conversations:", error);
  }
}


import {
  userLibraryFavorites,
  UserRadarFavorite,
  InsertUserRadarFavorite,
  userRadarFavorites,
  UserLibraryFavorite,
  InsertUserLibraryFavorite,
  libraryReviews,
  LibraryReview,
  InsertLibraryReview,
} from "../drizzle/schema";

export async function getUserRadarFavorites(userId: number): Promise<UserRadarFavorite[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db
      .select()
      .from(userRadarFavorites)
      .where(eq(userRadarFavorites.userId, userId))
      .orderBy(desc(userRadarFavorites.createdAt));
  } catch (error) {
    console.warn("[Database] Failed to fetch Radar favorites:", error);
    return [];
  }
}

export async function toggleUserRadarFavorite(userId: number, data: InsertUserRadarFavorite): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const existing = await db
      .select()
      .from(userRadarFavorites)
      .where(and(eq(userRadarFavorites.userId, userId), eq(userRadarFavorites.radarItemId, data.radarItemId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(userRadarFavorites)
        .where(and(eq(userRadarFavorites.userId, userId), eq(userRadarFavorites.radarItemId, data.radarItemId)));
      return false;
    }

    await db.insert(userRadarFavorites).values({ ...data, userId });
    return true;
  } catch (error) {
    console.warn("[Database] Failed to toggle Radar favorite:", error);
    return false;
  }
}

export async function updateUserRadarFavoriteTags(userId: number, radarItemId: string, tags: string[]): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const normalizedTags = Array.from(new Set(tags.map(tag => tag.trim().replace(/\s+/g, " ").slice(0, 40)).filter(Boolean))).slice(0, 20);
  try {
    const result = await db
      .update(userRadarFavorites)
      .set({ tags: JSON.stringify(normalizedTags) })
      .where(and(eq(userRadarFavorites.userId, userId), eq(userRadarFavorites.radarItemId, radarItemId)));
    return Number(result[0]?.affectedRows ?? 0) > 0;
  } catch (error) {
    console.warn("[Database] Failed to update Radar favorite tags:", error);
    return false;
  }
}

export async function batchUpdateUserRadarFavoriteTags(userId: number, radarItemIds: string[], tag: string, action: "add" | "remove"): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const normalizedTag = tag.trim().replace(/\s+/g, " ").slice(0, 40);
  if (!normalizedTag) return 0;
  try {
    const rows = await getUserRadarFavorites(userId);
    const selected = rows.filter(row => radarItemIds.includes(row.radarItemId));
    for (const row of selected) {
      const current = parseRadarFavoriteTags(row.tags);
      const next = action === "add"
        ? Array.from(new Set([...current, normalizedTag])).slice(0, 20)
        : current.filter(existing => existing !== normalizedTag);
      await db.update(userRadarFavorites)
        .set({ tags: JSON.stringify(next) })
        .where(and(eq(userRadarFavorites.userId, userId), eq(userRadarFavorites.radarItemId, row.radarItemId)));
    }
    return selected.length;
  } catch (error) {
    console.warn("[Database] Failed to batch update Radar favorite tags:", error);
    return 0;
  }
}

function parseRadarFavoriteTags(value: string | null | undefined): string[] {
  try {
    const parsed = JSON.parse(value ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
  } catch {
    return [];
  }
}

export async function getUserLibraryFavorites(userId: number): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const rows = await db
      .select()
      .from(userLibraryFavorites)
      .where(eq(userLibraryFavorites.userId, userId));
    return rows.map(r => r.libraryItemId);
  } catch (error) {
    console.warn("[Database] Failed to fetch library favorites:", error);
    return [];
  }
}

export async function toggleUserLibraryFavorite(userId: number, libraryItemId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    const existing = await db
      .select()
      .from(userLibraryFavorites)
      .where(and(eq(userLibraryFavorites.userId, userId), eq(userLibraryFavorites.libraryItemId, libraryItemId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(userLibraryFavorites)
        .where(and(eq(userLibraryFavorites.userId, userId), eq(userLibraryFavorites.libraryItemId, libraryItemId)));
      return false;
    } else {
      await db.insert(userLibraryFavorites).values({ userId, libraryItemId });
      return true;
    }
  } catch (error) {
    console.warn("[Database] Failed to toggle library favorite:", error);
    return false;
  }
}

export async function getLibraryReviews(libraryItemId: string): Promise<LibraryReview[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db
      .select()
      .from(libraryReviews)
      .where(eq(libraryReviews.libraryItemId, libraryItemId))
      .orderBy(desc(libraryReviews.createdAt))
      .limit(50);
  } catch (error) {
    console.warn("[Database] Failed to fetch library reviews:", error);
    return [];
  }
}

export async function addLibraryReview(data: InsertLibraryReview): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(libraryReviews).values(data);
  } catch (error) {
    console.warn("[Database] Failed to add library review:", error);
  }
}


export async function getVideoNotes(userId: number, videoId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(videoNotes).where(and(eq(videoNotes.userId, userId), eq(videoNotes.videoId, videoId)));
}

export async function getAllVideoNotes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(videoNotes).where(eq(videoNotes.userId, userId));
}

export async function addVideoNote(userId: number, videoId: string, timestampSeconds: number, noteText: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(videoNotes).values({
    userId,
    videoId,
    timestampSeconds,
    noteText,
    createdAt: new Date(),
  });
  return getVideoNotes(userId, videoId);
}

export async function deleteVideoNote(userId: number, noteId: number, videoId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(videoNotes).where(and(eq(videoNotes.userId, userId), eq(videoNotes.id, noteId)));
  return getVideoNotes(userId, videoId);
}

export async function saveExplanation(userId: number, title: string, content: string, moduleId: string, category: string = "Geral") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(savedExplanations).values({
    userId,
    title,
    content,
    moduleId,
    category,
  });
}

export async function getSavedExplanations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(savedExplanations).where(eq(savedExplanations.userId, userId)).orderBy(desc(savedExplanations.createdAt));
}

export async function upsertStudentMemory(userId: number, topic: string, summary: string, category: string = "Geral") {
  const db = await getDb();
  if (!db) return;
  // Check if memory for this topic exists
  const existing = await db.select().from(studentMemories).where(and(eq(studentMemories.userId, userId), eq(studentMemories.topic, topic)));
  if (existing.length > 0) {
    await db.update(studentMemories).set({ summary, category, updatedAt: new Date() }).where(eq(studentMemories.id, existing[0].id));
  } else {
    await db.insert(studentMemories).values({ userId, topic, summary, category });
  }
}

export async function getStudentMemories(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(studentMemories).where(eq(studentMemories.userId, userId)).orderBy(desc(studentMemories.updatedAt));
}

export async function saveStudyPlan(userId: number, title: string, content: string, focusArea: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(studyPlans).values({ userId, title, content, focusArea });
}

export async function getStudyPlans(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(studyPlans).where(eq(studyPlans.userId, userId)).orderBy(desc(studyPlans.createdAt));
}

export async function updateStudyPlanProgress(userId: number, planId: number, progressPercent: number, isCompleted: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(studyPlans)
    .set({ progressPercent, isCompleted })
    .where(and(eq(studyPlans.id, planId), eq(studyPlans.userId, userId)));
}

export async function deleteStudyPlan(userId: number, planId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(studyPlans)
    .where(and(eq(studyPlans.id, planId), eq(studyPlans.userId, userId)));
}

export async function deleteStudentMemory(userId: number, memoryId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(studentMemories)
    .where(and(eq(studentMemories.id, memoryId), eq(studentMemories.userId, userId)));
}

export async function updateStudentMemory(userId: number, memoryId: number, topic: string, summary: string, category: string) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(studentMemories)
    .set({ topic, summary, category, updatedAt: new Date() })
    .where(and(eq(studentMemories.id, memoryId), eq(studentMemories.userId, userId)));
}

export async function upsertNotionSync(userId: number, studyPlanId: number, notionPageId: string) {
  const db = await getDb();
  if (!db) return;
  const existing = await db
    .select()
    .from(notionSyncConfigs)
    .where(and(eq(notionSyncConfigs.userId, userId), eq(notionSyncConfigs.studyPlanId, studyPlanId)))
    .limit(1);
  if (existing.length > 0) {
    await db
      .update(notionSyncConfigs)
      .set({ notionPageId, lastSyncedAt: new Date() })
      .where(eq(notionSyncConfigs.id, existing[0].id));
  } else {
    await db.insert(notionSyncConfigs).values({ userId, studyPlanId, notionPageId });
  }
}

export async function getNotionSync(userId: number, studyPlanId: number) {
  const db = await getDb();
  if (!db) return null;
  const res = await db
    .select()
    .from(notionSyncConfigs)
    .where(and(eq(notionSyncConfigs.userId, userId), eq(notionSyncConfigs.studyPlanId, studyPlanId)))
    .limit(1);
  return res[0] || null;
}

export async function addCalendarEvent(userId: number, eventTitle: string, eventDate: string, source: string = "google_calendar") {
  const db = await getDb();
  if (!db) return;
  await db.insert(externalCalendarEvents).values({ userId, eventTitle, eventDate, source });
}

export async function getCalendarEvents(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(externalCalendarEvents)
    .where(eq(externalCalendarEvents.userId, userId))
    .orderBy(desc(externalCalendarEvents.createdAt));
}
