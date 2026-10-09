import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "pt-BR" | "en";
type TranslationKey =
  | "nav.learningPath"
  | "nav.projects"
  | "nav.careers"
  | "nav.certifications"
  | "nav.interactiveCertifications"
  | "nav.curiosities"
  | "nav.library"
  | "nav.videos"
  | "nav.specializations"
  | "nav.lab"
  | "nav.radar"
  | "nav.support"
  | "nav.dashboard"
  | "nav.savedExplanations"
  | "nav.profile"
  | "nav.logout"
  | "nav.login"
  | "nav.searchPlaceholder"
  | "nav.searchLabel"
  | "nav.openSearch"
  | "nav.toggleTheme"
  | "nav.languageLabel";

const LANGUAGE_STORAGE_KEY = "ia-academy-language";

const translations: Record<Language, Record<TranslationKey, string>> = {
  "pt-BR": {
    "nav.learningPath": "Trilha de Aprendizado",
    "nav.projects": "Projetos",
    "nav.careers": "Carreira",
    "nav.certifications": "Certificações",
    "nav.interactiveCertifications": "Certif. Interativa",
    "nav.curiosities": "Curiosidades",
    "nav.library": "Biblioteca",
    "nav.videos": "Vídeos",
    "nav.specializations": "Especializações",
    "nav.lab": "Laboratório",
    "nav.radar": "Radar de IA",
    "nav.support": "Apoie",
    "nav.dashboard": "Dashboard",
    "nav.savedExplanations": "Explicações Salvas",
    "nav.profile": "Perfil",
    "nav.logout": "Sair",
    "nav.login": "Entrar",
    "nav.searchPlaceholder": "Buscar conteúdos de IA",
    "nav.searchLabel": "Buscar conteúdos de IA",
    "nav.openSearch": "Abrir busca de conteúdos",
    "nav.toggleTheme": "Alternar tema",
    "nav.languageLabel": "Selecionar idioma",
  },
  en: {
    "nav.learningPath": "Learning Path",
    "nav.projects": "Projects",
    "nav.careers": "Career",
    "nav.certifications": "Certifications",
    "nav.interactiveCertifications": "Interactive Cert.",
    "nav.curiosities": "Curiosities",
    "nav.library": "Library",
    "nav.videos": "Videos",
    "nav.specializations": "Specializations",
    "nav.lab": "Professional Lab",
    "nav.radar": "AI Radar",
    "nav.support": "Support",
    "nav.dashboard": "Dashboard",
    "nav.savedExplanations": "Saved Explanations",
    "nav.profile": "Profile",
    "nav.logout": "Sign out",
    "nav.login": "Sign in",
    "nav.searchPlaceholder": "Search AI content",
    "nav.searchLabel": "Search AI content",
    "nav.openSearch": "Open content search",
    "nav.toggleTheme": "Toggle theme",
    "nav.languageLabel": "Select language",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const defaultValue: LanguageContextValue = {
  language: "pt-BR",
  setLanguage: () => undefined,
  toggleLanguage: () => undefined,
  t: key => translations["pt-BR"][key],
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "pt-BR";
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "pt-BR";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage);
  const toggleLanguage = () => setLanguageState(current => current === "pt-BR" ? "en" : "pt-BR");
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t: key => translations[language][key],
  }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export type { Language, TranslationKey };
export { LANGUAGE_STORAGE_KEY };
