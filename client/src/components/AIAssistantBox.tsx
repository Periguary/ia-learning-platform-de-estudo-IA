import React, { useEffect, useState } from "react";
import { Sparkles, History, BookMarked, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

type AIAssistantBoxProps = {
  moduleId: string;
  courseTitle: string;
  courseDescription: string;
  lessonTitle?: string;
  lessonContent?: string;
  studentNotes?: string;
};

const defaultPrompts = [
  "Me dê uma aula completa explicando este conceito do zero.",
  "Explique este conceito com uma analogia simples do mundo real.",
  "Qual é o raciocínio passo a passo e quais erros devo evitar?",
  "Crie um exercício prático desafiador com gabarito explicado.",
];

export function AIAssistantBox({
  moduleId,
  courseTitle,
  courseDescription,
  lessonTitle,
  lessonContent,
  studentNotes,
}: AIAssistantBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const historyQuery = trpc.ai.history.useQuery(
    { moduleId },
    { enabled: showHistory }
  );

  const clearHistoryMutation = trpc.ai.clearHistory.useMutation({
    onSuccess: () => {
      void historyQuery.refetch();
    },
  });

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
      studentNotes,
      question: content,
      history: previousConversation,
    });
  };

  const startNewTopic = () => {
    setMessages([]);
    askMutation.reset();
    setShowHistory(false);
  };

  const clearSavedHistory = () => {
    setMessages([]);
    askMutation.reset();
    setShowHistory(false);
    clearHistoryMutation.mutate({ moduleId });
  };

  const loadPastConversation = (q: string, a: string, pastLesson?: string | null) => {
    setMessages([
      { role: "user", content: `[Histórico - ${pastLesson || "Visão Geral"}] ${q}` },
      { role: "assistant", content: a },
    ]);
    setShowHistory(false);
  };

  return (
    <section
      aria-labelledby="ai-assistant-title"
      className="mt-6 overflow-hidden rounded-xl border border-primary/20 bg-card shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="size-5 animate-pulse" aria-hidden="true" />
            </div>
            <div>
              <h2 id="ai-assistant-title" className="text-xl font-bold">
                Professor Virtual de IA
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Seu mentor dedicado para aulas particulares, explicações passo a passo e exercícios guiados sobre {lessonTitle ? `“${lessonTitle}”` : `o módulo ${courseTitle}`}.
              </p>
            </div>
          </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={startNewTopic}
            title="Começar um novo tópico sem apagar o histórico salvo"
          >
            <RotateCcw className="size-4" />
            Novo Tópico
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs text-destructive hover:text-destructive"
            onClick={clearSavedHistory}
            disabled={clearHistoryMutation.isPending}
            title="Apagar o histórico salvo deste módulo"
          >
            {clearHistoryMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Limpar Histórico
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => setShowHistory(prev => !prev)}
          >
            <History className="size-4" />
            {showHistory ? "Voltar ao Chat" : "Histórico Salvo"}
          </Button>
        </div>
      </div>

      {showHistory ? (
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <BookMarked className="size-4 text-primary" />
            Conversas anteriores neste módulo
          </h3>
          {historyQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : historyQuery.data && historyQuery.data.length > 0 ? (
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
              {historyQuery.data.map(item => (
                <div
                  key={item.id}
                  onClick={() => loadPastConversation(item.question, item.answer, item.lessonTitle)}
                  className="p-3 rounded-lg border border-border bg-muted/30 hover:border-primary/50 cursor-pointer transition-colors space-y-1 text-left"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{item.lessonTitle || "Geral do Módulo"}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">P: {item.question}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma conversa salva ainda. Tire dúvidas para construirmos seu histórico de revisão.
            </p>
          )}
        </div>
      ) : (
        <AIChatBox
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={askMutation.isPending}
          placeholder="Digite sua dúvida sobre esta aula..."
          height="420px"
          emptyStateMessage="Pergunte ao tutor e receba explicações e links de materiais complementares."
          suggestedPrompts={defaultPrompts}
          className="rounded-none border-0 shadow-none"
        />
      )}
    </section>
  );
}
