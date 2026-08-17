export type ProfilePreferences = {
  name?: string;
  bio?: string;
  avatarDataUrl?: string;
};

export const PROFILE_PREFERENCES_STORAGE_KEY = "ia-academy-profile-preferences";

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
    // O perfil continua disponível na sessão se o armazenamento estiver bloqueado.
  }
}

export function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "IA";
}
