import React, { useState } from "react";
import { Check, Clipboard, Mail, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ShareActionsProps = {
  title: string;
  text: string;
  url?: string;
  compact?: boolean;
};

export function ShareActions({ title, text, url, compact = false }: ShareActionsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `${text} ${shareUrl}`.trim();

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (typeof navigator.share !== "function") {
      setOpen(true);
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, text, url: shareUrl });
      setOpen(false);
    } catch {
      // Cancelar o diálogo nativo não é um erro para o aluno.
    }
  };

  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-label={`Compartilhar ${title}`}
      >
        <Share2 className="size-3.5" />
        {compact ? "Compartilhar" : "Compartilhar"}
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border bg-popover p-2 shadow-xl">
          <button type="button" onClick={() => void nativeShare()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-muted">
            <Send className="size-3.5 text-primary" /> Compartilhar no dispositivo
          </button>
          <button type="button" onClick={() => void copyLink()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-muted">
            {copied ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5 text-secondary" />}
            {copied ? "Link copiado" : "Copiar link"}
          </button>
          <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted">
            <Send className="size-3.5 text-emerald-400" /> WhatsApp
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted">
            <Share2 className="size-3.5 text-blue-400" /> LinkedIn
          </a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted">
            <Send className="size-3.5 text-sky-400" /> Telegram
          </a>
          <a href={`mailto:?subject=${encodedTitle}&body=${encodedText}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-muted">
            <Mail className="size-3.5 text-amber-400" /> Enviar por e-mail
          </a>
        </div>
      )}
    </div>
  );
}
