import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";

export type Language = "pt-BR" | "en";
export type TranslationKey =
  | "nav.learningPath" | "nav.projects" | "nav.careers" | "nav.certifications" | "nav.interactiveCertifications"
  | "nav.curiosities" | "nav.library" | "nav.videos" | "nav.specializations" | "nav.lab" | "nav.radar" | "nav.support"
  | "nav.dashboard" | "nav.savedExplanations" | "nav.profile" | "nav.logout" | "nav.login" | "nav.searchPlaceholder"
  | "nav.searchLabel" | "nav.openSearch" | "nav.toggleTheme" | "nav.languageLabel"
  | "common.backToPath" | "common.loading" | "common.nextLesson" | "common.markComplete" | "common.completed"
  | "common.courseNotFound" | "common.openOfficialSource" | "common.noResults"
  | "home.banner" | "home.explore" | "home.platformKicker" | "home.headline" | "home.headlineAccent" | "home.description"
  | "home.startFree" | "home.continuePath" | "home.explorePath" | "home.support" | "home.contentHours" | "home.completePath"
  | "home.availableModules" | "home.categories" | "home.categoriesDescription" | "home.whyTitle" | "home.whyDescription"
  | "home.curatedTitle" | "home.curatedDescription" | "cert.title" | "cert.description" | "cert.freeTitle" | "cert.freeDescription"
  | "cert.provider" | "cert.level" | "cert.mode" | "cert.completed" | "cert.markCompleted" | "cert.signInProgress"
  | "cert.openSource" | "cert.noResults" | "lesson.overview" | "lesson.whatLearn" | "lesson.whyImportant" | "lesson.examples"
  | "lesson.connectedResources" | "lesson.aiTutor" | "tutor.title" | "tutor.placeholder" | "tutor.error" | "tutor.saved"
  | "tutor.newTopic" | "tutor.clearHistory" | "tutor.generateQuiz" | "tutor.studyPlan" | "tutor.exportPdf" | "tutor.historyEmpty"
  | "tutor.languageInstruction";

export const LANGUAGE_STORAGE_KEY = "ia-academy-language";

const translations: Record<Language, Record<TranslationKey, string>> = {
  "pt-BR": {
    "nav.learningPath": "Trilha de Aprendizado", "nav.projects": "Projetos", "nav.careers": "Carreira", "nav.certifications": "Certificações", "nav.interactiveCertifications": "Certif. Interativa", "nav.curiosities": "Curiosidades", "nav.library": "Biblioteca", "nav.videos": "Vídeos", "nav.specializations": "Especializações", "nav.lab": "Laboratório", "nav.radar": "Radar de IA", "nav.support": "Apoie", "nav.dashboard": "Dashboard", "nav.savedExplanations": "Explicações Salvas", "nav.profile": "Perfil", "nav.logout": "Sair", "nav.login": "Entrar", "nav.searchPlaceholder": "Buscar conteúdos de IA", "nav.searchLabel": "Buscar conteúdos de IA", "nav.openSearch": "Abrir busca de conteúdos", "nav.toggleTheme": "Alternar tema", "nav.languageLabel": "Selecionar idioma",
    "common.backToPath": "Voltar para Trilha", "common.loading": "Carregando…", "common.nextLesson": "Próxima Aula", "common.markComplete": "Marcar como Concluída", "common.completed": "Aula Concluída", "common.courseNotFound": "Curso não encontrado", "common.openOfficialSource": "Abrir fonte oficial", "common.noResults": "Nenhum resultado corresponde aos filtros selecionados.",
    "home.banner": "Nova Trilha de IA Generativa e LLMs Disponível!", "home.explore": "Explorar →", "home.platformKicker": "Plataforma Líder em Educação de IA", "home.headline": "Aprenda o que importa para", "home.headlineAccent": "acelerar sua carreira", "home.description": "Domine Inteligência Artificial, Machine Learning, Deep Learning e Ciência de Dados do zero ao nível profissional com trilhas estruturadas e projetos reais.", "home.startFree": "Começar Gratuitamente", "home.continuePath": "Continuar Trilha", "home.explorePath": "Explorar Trilha", "home.support": "Apoie o projeto", "home.contentHours": "Horas de Conteúdo", "home.completePath": "Trilha Completa", "home.availableModules": "Módulos disponíveis", "home.categories": "Explore por Categoria", "home.categoriesDescription": "Encontre exatamente o que você precisa para dominar a tecnologia do futuro.", "home.whyTitle": "Por que escolher a IA Academy?", "home.whyDescription": "Desenvolvido para apoiar o seu sucesso profissional.", "home.curatedTitle": "Mais caminhos para estudar e validar suas habilidades", "home.curatedDescription": "Explore cursos gratuitos, microcursos com certificado de conclusão e credenciais práticas de fontes oficiais.",
    "cert.title": "Certificações Recomendadas", "cert.description": "Explore certificações reconhecidas globalmente que podem fortalecer suas competências.", "cert.freeTitle": "Cursos e credenciais gratuitas", "cert.freeDescription": "Opções oficiais de Microsoft, Google Cloud, AWS, Kaggle e Hugging Face. Confira as condições de acesso e disponibilidade regional.", "cert.provider": "Provedor", "cert.level": "Nível", "cert.mode": "Modalidade", "cert.completed": "Concluído", "cert.markCompleted": "Marcar como concluído", "cert.signInProgress": "Entrar para acompanhar", "cert.openSource": "Abrir fonte oficial", "cert.noResults": "Nenhum recurso corresponde aos filtros selecionados.",
    "lesson.overview": "Visão Geral do Curso", "lesson.whatLearn": "O que você aprenderá", "lesson.whyImportant": "Por que é importante?", "lesson.examples": "Exemplos Práticos:", "lesson.connectedResources": "Ecossistema Conectado e Recursos", "lesson.aiTutor": "Tutor IA",
    "tutor.title": "Professor Virtual de IA", "tutor.placeholder": "Digite sua dúvida sobre esta aula...", "tutor.error": "Não consegui responder agora. Tente novamente em instantes.", "tutor.saved": "Explicação salva na sua Lista de Leitura com sucesso!", "tutor.newTopic": "Novo Tópico", "tutor.clearHistory": "Limpar Histórico", "tutor.generateQuiz": "Gerar Quiz", "tutor.studyPlan": "Plano de Estudos", "tutor.exportPdf": "Exportar PDF", "tutor.historyEmpty": "Nenhuma conversa salva ainda.", "tutor.languageInstruction": "Responda em português do Brasil, com clareza e exemplos didáticos.",
  },
  en: {
    "nav.learningPath": "Learning Path", "nav.projects": "Projects", "nav.careers": "Career", "nav.certifications": "Certifications", "nav.interactiveCertifications": "Interactive Cert.", "nav.curiosities": "Curiosities", "nav.library": "Library", "nav.videos": "Videos", "nav.specializations": "Specializations", "nav.lab": "Professional Lab", "nav.radar": "AI Radar", "nav.support": "Support", "nav.dashboard": "Dashboard", "nav.savedExplanations": "Saved Explanations", "nav.profile": "Profile", "nav.logout": "Sign out", "nav.login": "Sign in", "nav.searchPlaceholder": "Search AI content", "nav.searchLabel": "Search AI content", "nav.openSearch": "Open content search", "nav.toggleTheme": "Toggle theme", "nav.languageLabel": "Select language",
    "common.backToPath": "Back to Learning Path", "common.loading": "Loading…", "common.nextLesson": "Next Lesson", "common.markComplete": "Mark as Complete", "common.completed": "Lesson Completed", "common.courseNotFound": "Course not found", "common.openOfficialSource": "Open official source", "common.noResults": "No results match the selected filters.",
    "home.banner": "New Generative AI and LLM Learning Path Available!", "home.explore": "Explore →", "home.platformKicker": "Leading AI Education Platform", "home.headline": "Learn what matters to", "home.headlineAccent": "accelerate your career", "home.description": "Master Artificial Intelligence, Machine Learning, Deep Learning and Data Science from beginner to professional level with structured paths and real projects.", "home.startFree": "Start for Free", "home.continuePath": "Continue Path", "home.explorePath": "Explore Path", "home.support": "Support the project", "home.contentHours": "Content Hours", "home.completePath": "Complete Path", "home.availableModules": "Available modules", "home.categories": "Explore by Category", "home.categoriesDescription": "Find exactly what you need to master the technology of the future.", "home.whyTitle": "Why choose IA Academy?", "home.whyDescription": "Built to support your professional success.", "home.curatedTitle": "More ways to study and validate your skills", "home.curatedDescription": "Explore free courses, certificate micro-courses and practical credentials from official sources.",
    "cert.title": "Recommended Certifications", "cert.description": "Explore globally recognized certifications that can strengthen your skills.", "cert.freeTitle": "Free courses and credentials", "cert.freeDescription": "Official options from Microsoft, Google Cloud, AWS, Kaggle and Hugging Face. Check access requirements and regional availability.", "cert.provider": "Provider", "cert.level": "Level", "cert.mode": "Format", "cert.completed": "Completed", "cert.markCompleted": "Mark as completed", "cert.signInProgress": "Sign in to track progress", "cert.openSource": "Open official source", "cert.noResults": "No resource matches the selected filters.",
    "lesson.overview": "Course Overview", "lesson.whatLearn": "What you will learn", "lesson.whyImportant": "Why it matters", "lesson.examples": "Practical Examples:", "lesson.connectedResources": "Connected Ecosystem and Resources", "lesson.aiTutor": "AI Tutor",
    "tutor.title": "AI Virtual Professor", "tutor.placeholder": "Type your question about this lesson...", "tutor.error": "I could not answer right now. Please try again in a moment.", "tutor.saved": "Explanation saved to your Reading List successfully!", "tutor.newTopic": "New Topic", "tutor.clearHistory": "Clear History", "tutor.generateQuiz": "Generate Quiz", "tutor.studyPlan": "Study Plan", "tutor.exportPdf": "Export PDF", "tutor.historyEmpty": "No saved conversations yet.", "tutor.languageInstruction": "Answer in English, clearly and with didactic examples.",
  },
};

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "pt-BR";
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "pt-BR";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const authQuery = trpc.auth.me.useQuery();
  const updateLanguageMutation = trpc.auth.updateLanguage.useMutation();
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    const profileLanguage = authQuery.data?.language;
    if (!window.localStorage.getItem(LANGUAGE_STORAGE_KEY) && (profileLanguage === "en" || profileLanguage === "pt-BR")) {
      setLanguageState(profileLanguage);
    }
  }, [authQuery.data?.language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (authQuery.data?.id) updateLanguageMutation.mutate({ language: nextLanguage });
  };
  const toggleLanguage = () => setLanguage(language === "pt-BR" ? "en" : "pt-BR");
  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t: (key: TranslationKey) => translations[language][key] }), [language, authQuery.data?.id]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; toggleLanguage: () => void; t: (key: TranslationKey) => string };
const LanguageContext = createContext<LanguageContextValue>({ language: "pt-BR", setLanguage: () => undefined, toggleLanguage: () => undefined, t: (key: TranslationKey) => translations["pt-BR"][key] });
export function useLanguage() { return useContext(LanguageContext); }
