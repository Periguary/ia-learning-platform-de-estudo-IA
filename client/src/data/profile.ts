export type ProfilePreferences = {
  name?: string;
  bio?: string;
  avatarDataUrl?: string;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
  publicToken?: string;
  publicEnabled?: boolean;
};

export type StudyActivity = {
  completedLessons: number;
  certificationAttempts: number;
};

export const PROFILE_PREFERENCES_STORAGE_KEY = "ia-academy-profile-preferences";
export const STUDY_ACTIVITY_STORAGE_KEY = "ia-academy-study-activity";

export function readProfilePreferences(storage?: Pick<Storage, "getItem">): ProfilePreferences {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    const raw = target?.getItem(PROFILE_PREFERENCES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProfilePreferences;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeProfilePreferences(preferences: ProfilePreferences, storage?: Pick<Storage, "setItem">): void {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    target?.setItem(PROFILE_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Perfil preservado na sessão.
  }
}

export function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "IA";
}

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function readStudyActivity(storage?: Pick<Storage, "getItem">): Record<string, StudyActivity> {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    const raw = target?.getItem(STUDY_ACTIVITY_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StudyActivity>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function recordStudyActivity(delta: Partial<StudyActivity>, storage?: Storage): void {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    if (!target) return;
    const activity = readStudyActivity(target);
    const key = dateKey();
    const current = activity[key] ?? { completedLessons: 0, certificationAttempts: 0 };
    activity[key] = {
      completedLessons: current.completedLessons + (delta.completedLessons ?? 0),
      certificationAttempts: current.certificationAttempts + (delta.certificationAttempts ?? 0),
    };
    target.setItem(STUDY_ACTIVITY_STORAGE_KEY, JSON.stringify(activity));
  } catch {
    // A atividade não deve bloquear o fluxo de estudo.
  }
}

export function getWeeklyActivity(storage?: Pick<Storage, "getItem">) {
  const activity = readStudyActivity(storage);
  const today = new Date();
  const items = [] as Array<{ day: string; date: string; completedLessons: number; certificationAttempts: number }>;
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setHours(12, 0, 0, 0);
    date.setDate(today.getDate() - offset);
    const key = dateKey(date);
    const record = activity[key] ?? { completedLessons: 0, certificationAttempts: 0 };
    items.push({ day: date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""), date: key, ...record });
  }
  return items;
}

export type PublicProfileSnapshot = {
  name: string;
  bio: string;
  avatarDataUrl?: string;
  badges: string[];
  certifications: Array<{ title: string; issuer: string; score: number; completedAt?: string }>;
  nonce: string;
};

export function createPublicProfileToken(snapshot: Omit<PublicProfileSnapshot, "nonce">): string {
  const payload: PublicProfileSnapshot = { ...snapshot, nonce: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}` };
  const encoded = encodeURIComponent(JSON.stringify(payload)).replace(/%([0-9A-F]{2})/g, (_, pair) => String.fromCharCode(Number.parseInt(pair, 16)));
  return btoa(encoded).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function parsePublicProfileToken(token: string): PublicProfileSnapshot | null {
  try {
    const normalized = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const decoded = decodeURIComponent(atob(padded).split("").map(char => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""));
    const parsed = JSON.parse(decoded) as PublicProfileSnapshot;
    if (!parsed?.name || !Array.isArray(parsed.badges) || !Array.isArray(parsed.certifications) || !parsed.nonce) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getStudyStreak(storage?: Pick<Storage, "getItem">) {
  const activity = readStudyActivity(storage);
  let currentStreak = 0;
  const cursor = new Date();
  while (true) {
    const key = dateKey(cursor);
    const record = activity[key];
    if (!record || (record.completedLessons === 0 && record.certificationAttempts === 0)) break;
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  let bestStreak = 0;
  let run = 0;
  Object.keys(activity).sort().forEach(key => {
    const record = activity[key];
    if (record.completedLessons > 0 || record.certificationAttempts > 0) run += 1;
    else run = 0;
    bestStreak = Math.max(bestStreak, run);
  });
  return { currentStreak, bestStreak, activeToday: currentStreak > 0 };
}
