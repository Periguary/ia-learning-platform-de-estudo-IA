import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here


export const aiConversations = mysqlTable("ai_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  lessonTitle: varchar("lessonTitle", { length: 300 }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  recommendations: text("recommendations"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AIConversation = typeof aiConversations.$inferSelect;
export type InsertAIConversation = typeof aiConversations.$inferInsert;


export const aiUpdateCandidates = mysqlTable("ai_update_candidates", {
  id: int("id").autoincrement().primaryKey(),
  sourceUrl: varchar("sourceUrl", { length: 500 }).notNull(),
  sourceName: varchar("sourceName", { length: 160 }).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  summary: text("summary").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  relatedModules: text("relatedModules").notNull(),
  learningAction: text("learningAction").notNull(),
  publishedAt: timestamp("publishedAt"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIUpdateCandidate = typeof aiUpdateCandidates.$inferSelect;
export type InsertAIUpdateCandidate = typeof aiUpdateCandidates.$inferInsert;

export const userRadarFavorites = mysqlTable("user_radar_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  radarItemId: varchar("radarItemId", { length: 180 }).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  summary: text("summary").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  sourceName: varchar("sourceName", { length: 160 }).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 500 }).notNull(),
  relatedModules: text("relatedModules").notNull(),
  learningAction: text("learningAction").notNull(),
  publishedAt: varchar("publishedAt", { length: 40 }),
  tags: text("tags").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserRadarFavorite = typeof userRadarFavorites.$inferSelect;
export type InsertUserRadarFavorite = typeof userRadarFavorites.$inferInsert;


export const userLibraryFavorites = mysqlTable("user_library_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  libraryItemId: varchar("libraryItemId", { length: 120 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserLibraryFavorite = typeof userLibraryFavorites.$inferSelect;
export type InsertUserLibraryFavorite = typeof userLibraryFavorites.$inferInsert;

export const savedExplanations = mysqlTable("saved_explanations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content").notNull(),
  moduleId: varchar("moduleId", { length: 120 }).notNull(),
  category: varchar("category", { length: 80 }).default("Geral").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SavedExplanation = typeof savedExplanations.$inferSelect;
export type InsertSavedExplanation = typeof savedExplanations.$inferInsert;

export const studentMemories = mysqlTable("student_memories", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  category: varchar("category", { length: 80 }).default("Geral").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StudentMemory = typeof studentMemories.$inferSelect;
export type InsertStudentMemory = typeof studentMemories.$inferInsert;

export const studyPlans = mysqlTable("study_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  focusArea: varchar("focusArea", { length: 120 }).notNull(),
  isCompleted: int("isCompleted").default(0).notNull(), // 0 ou 1
  progressPercent: int("progressPercent").default(0).notNull(), // 0 a 100
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StudyPlan = typeof studyPlans.$inferSelect;
export type InsertStudyPlan = typeof studyPlans.$inferInsert;

export const libraryReviews = mysqlTable("library_reviews", {
  id: int("id").autoincrement().primaryKey(),
  libraryItemId: varchar("libraryItemId", { length: 120 }).notNull(),
  userId: int("userId").notNull(),
  userName: varchar("userName", { length: 160 }).notNull(),
  rating: int("rating").notNull(), // 1 a 5
  comment: text("comment").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LibraryReview = typeof libraryReviews.$inferSelect;
export type InsertLibraryReview = typeof libraryReviews.$inferInsert;


export const videoNotes = mysqlTable("video_notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  videoId: varchar("videoId", { length: 128 }).notNull(),
  timestampSeconds: int("timestampSeconds").notNull().default(0),
  noteText: text("noteText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const challengeSubmissions = mysqlTable("challenge_submissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  challengeId: varchar("challengeId", { length: 160 }).notNull(),
  responseText: text("responseText").notNull(),
  notebookName: varchar("notebookName", { length: 255 }),
  notebookContent: text("notebookContent"),
  status: mysqlEnum("status", ["submitted", "evaluated", "needs_review"]).default("submitted").notNull(),
  score: int("score"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChallengeSubmission = typeof challengeSubmissions.$inferSelect;
export type InsertChallengeSubmission = typeof challengeSubmissions.$inferInsert;


export const notionSyncConfigs = mysqlTable("notion_sync_configs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  studyPlanId: int("studyPlanId").notNull(),
  notionPageId: varchar("notionPageId", { length: 191 }).notNull(),
  lastSyncedAt: timestamp("lastSyncedAt").defaultNow().notNull(),
});

export const externalCalendarEvents = mysqlTable("external_calendar_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  eventTitle: varchar("eventTitle", { length: 255 }).notNull(),
  eventDate: varchar("eventDate", { length: 64 }).notNull(),
  source: varchar("source", { length: 64 }).default("google_calendar").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
