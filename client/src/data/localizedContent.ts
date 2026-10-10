import type { Language } from "@/contexts/LanguageContext";

const phraseTranslations: Array<[string, string]> = [
  ["O que é ", "What is "], ["Aplicações em IA", "Applications in AI"], ["Ferramentas e Bibliotecas", "Tools and Libraries"],
  ["Conceito de Vetor", "Vector Concept"], ["Operações Vetoriais", "Vector Operations"], ["Produto Escalar", "Dot Product"], ["Produto Vetorial", "Cross Product"],
  ["Conceito de Matriz", "Matrix Concept"], ["Operações com Matrizes", "Matrix Operations"], ["Determinantes", "Determinants"], ["Matrizes Inversas", "Inverse Matrices"],
  ["Introdução", "Introduction"], ["Fundamentos", "Fundamentals"], ["Variáveis Aleatórias", "Random Variables"], ["Aplicações", "Applications"], ["Projeto Final", "Final Project"],
  ["Visão Computacional", "Computer Vision"], ["Processamento de Imagens", "Image Processing"], ["Redes Neurais Convolucionais", "Convolutional Neural Networks"], ["Computação Cognitiva", "Cognitive Computing"], ["Redes Neurais Generativas", "Generative Neural Networks"],
  ["Iniciante", "Beginner"], ["Intermediário", "Intermediate"], ["Avançado", "Advanced"], ["horas", "hours"], ["aulas", "lessons"],
  ["Fundamentos de ", "Fundamentals of "], ["Análise de dados", "Data analysis"], ["e aplicações reais", "and real-world applications"],
  ["A diferença entre uma demonstração e um sistema confiável está na qualidade dos dados", "The difference between a demo and a reliable system lies in data quality"],
  ["Conceitos essenciais", "Essential concepts"], ["Como raciocinar", "How to reason"], ["Cuidados", "Precautions"], ["Boas práticas", "Best practices"], ["Entregáveis", "Deliverables"],
  ["Exemplos práticos", "Practical examples"], ["arquivo não encontrado", "file not found"], ["época concluída", "epoch completed"], ["Uma imagem digital pode ser representada como uma matriz.", "A digital image can be represented as a matrix."],
];

export function localizeEducationalText(text: string | undefined, language: Language) {
  if (!text || language === "pt-BR") return text ?? "";
  return phraseTranslations.reduce((result, [source, target]) => result.replaceAll(source, target), text);
}

export function localizeCourse<T extends { title: string; description: string; difficulty?: string; duration?: string; sections?: Array<{ title: string; lessons: Array<{ title: string; id: number; completed?: boolean }> }> }>(course: T, language: Language): T {
  if (language === "pt-BR") return course;
  return {
    ...course,
    title: localizeEducationalText(course.title, language),
    description: localizeEducationalText(course.description, language),
    difficulty: localizeEducationalText(course.difficulty, language),
    duration: localizeEducationalText(course.duration, language),
    sections: course.sections?.map(section => ({
      ...section,
      title: localizeEducationalText(section.title, language),
      lessons: section.lessons.map(lesson => ({ ...lesson, title: localizeEducationalText(lesson.title, language) })),
    })),
  };
}
