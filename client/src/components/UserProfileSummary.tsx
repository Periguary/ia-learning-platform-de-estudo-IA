import { UserRound } from "lucide-react";

export interface UserProfileSummaryProps {
  name?: string | null;
  email?: string | null;
  onOpen: () => void;
}

export function UserProfileSummary({ name, email, onOpen }: UserProfileSummaryProps) {
  const displayName = name || "Estudante";
  return (
    <button type="button" onClick={onOpen} className="hidden lg:flex items-center gap-2 border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-left transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Abrir perfil de ${displayName}`}>
      <UserRound className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <span className="max-w-36 truncate">
        <strong className="block truncate text-xs text-foreground">{displayName}</strong>
        <span className="block truncate text-[10px] text-muted-foreground">{email || "E-mail não informado"}</span>
      </span>
    </button>
  );
}
