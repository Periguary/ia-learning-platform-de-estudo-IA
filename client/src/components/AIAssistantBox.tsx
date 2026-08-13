import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";

type AIAssistantBoxProps = {
  moduleId: string;
  courseTitle: string;
  courseDescription: string;
  lessonTitle?: string;
  lessonContent?: string;
};

const defaultPrompts = [
  "Explique este conceito com uma analogia simples.",
  "Quais são os erros mais comuns nesta aula?",
  "Crie um exercício curto para eu praticar.",
];

export function AIAssistantBox({
  moduleId,
  courseTitle,
  courseDescription,
  lessonTitle,
  lessonContent,
}: AIAssistantBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const askMutation = trpc.ai.ask.useMutation({
    onSuccess: ({ answer }) => {
      setMessages(previous => [
        ...previous,
        { role: "assistant", content: answer },
      ]);
    },
    onError: error => {
      setMessages(previous => [
        ...previous,
        {
          role: "assistant",
          content: error.message || "Não consegui responder agora. Tente novamente em instantes.",
        },
      ]);
    },
  });

  useEffect(() => {
    setMessages([]);
    askMutation.reset();
  }, [moduleId, lessonTitle]);

  const handleSendMessage = (content: string) => {
    const previousConversation = messages
      .filter((message): message is Extract<Message, { role: "user" | "assistant" }> => message.role !== "system")
      .slice(-6);
    setMessages(previous => [
      ...previous,
      { role: "user", content },
    ]);

    askMutation.mutate({
      moduleId,
      courseTitle,
      courseDescription,
      lessonTitle,
      lessonContent,
      question: content,
      history: previousConversation,
    });
  };

  return (
    <section
      aria-labelledby="ai-assistant-title"
      className="mt-6 overflow-hidden rounded-xl border border-primary/20 bg-card shadow-sm"
    >
      <div className="flex items-start gap-3 border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 id="ai-assistant-title" className="text-xl font-bold">
            Tutor IA da aula
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tire dúvidas sobre {lessonTitle ? `“${lessonTitle}”` : `o módulo ${courseTitle}`} usando o conteúdo estudado.
          </p>
        </div>
      </div>

      <AIChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={askMutation.isPending}
        placeholder="Digite sua dúvida sobre esta aula..."
        height="420px"
        emptyStateMessage="Pergunte ao tutor sobre o conceito que você está estudando."
        suggestedPrompts={defaultPrompts}
        className="rounded-none border-0 shadow-none"
      />
    </section>
  );
}
