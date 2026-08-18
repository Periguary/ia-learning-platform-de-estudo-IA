import React, { useMemo, useState } from "react";
import { Award, ArrowRight, BarChart3, CalendarDays, CheckCircle2, Clock3, Copy, Flame, Globe2, Linkedin, Link2, Medal, Move, Pencil, Save, ShieldCheck, Sparkles, Trophy, Upload, UserRound, ZoomIn } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { interactiveCertificationsCatalog } from "@/data/interactiveCertificationCatalog";
import { formatCompletionDate, getCertificationStats, readAnswerHistory, readCompletionHistory } from "@/data/certificationProgress";
import { coursesData } from "@/data/coursesData";
import { createPublicProfileToken, getInitials, getStudyStreak, getWeeklyActivity, readProfilePreferences, readStudyActivity, writeProfilePreferences } from "@/data/profile";
import ProfileStatsSection from "@/components/ProfileStatsSection";
import { readProgress } from "@/data/progress";

function formatStudyTime(hours: number) {
  const minutes = Math.round(hours * 60);
  if (minutes < 60) return `${minutes} min`;
  const wholeHours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${wholeHours}h ${remainingMinutes}min` : `${wholeHours}h`;
}

function createCroppedAvatar(source: string, zoom: number, offsetX: number, offsetY: number): Promise<string> {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) return resolve(source);
      const scale = Math.max(size / image.width, size / image.height) * zoom;
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (size - width) / 2 + offsetX, (size - height) / 2 + offsetY, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    image.onerror = () => resolve(source);
    image.src = source;
  });
}

export default function Profile() {
  const { user, loading } = useAuth();
  const preferences = useMemo(() => readProfilePreferences(), []);
  const answerHistory = useMemo(() => readAnswerHistory(), []);
  const completionHistory = useMemo(() => readCompletionHistory(), []);
  const lessonProgress = useMemo(() => readProgress(), []);
  const weeklyActivity = useMemo(() => getWeeklyActivity(), []);
  const studyStreak = useMemo(() => getStudyStreak(), []);
  const baseName = user?.name?.trim() || "Aluno IA Academy";
  const [profileName, setProfileName] = useState(preferences.name?.trim() || baseName);
  const [profileBio, setProfileBio] = useState(preferences.bio || "");
  const [avatarDataUrl, setAvatarDataUrl] = useState(preferences.avatarDataUrl || "");
  const [avatarDraftUrl, setAvatarDraftUrl] = useState(preferences.avatarDataUrl || "");
  const [avatarZoom, setAvatarZoom] = useState(preferences.zoom || 1);
  const [avatarOffsetX, setAvatarOffsetX] = useState(preferences.offsetX || 0);
  const [avatarOffsetY, setAvatarOffsetY] = useState(preferences.offsetY || 0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPublicEnabled, setIsPublicEnabled] = useState(Boolean(preferences.publicEnabled));
  const [savedNotice, setSavedNotice] = useState(false);
  const [linkNotice, setLinkNotice] = useState(false);

  const certifications = useMemo(() => interactiveCertificationsCatalog.map(cert => {
    const stats = getCertificationStats(cert, answerHistory[cert.id]);
    const history = completionHistory[cert.id];
    return { cert, stats, history, completed: stats.completed || Boolean(history) };
  }).filter(item => item.completed), [answerHistory, completionHistory]);
  const completedCount = certifications.length;
  const perfectCount = certifications.filter(item => item.stats.scorePercentage === 100 || item.history?.scorePercentage === 100).length;
  const studyHours = useMemo(() => Object.entries(coursesData).reduce((total, [moduleId, course]) => {
    const completedLessons = Math.min(lessonProgress[moduleId]?.length ?? 0, course.lessons ?? 0);
    const durationHours = Number.parseInt(String(course.duration ?? "0"), 10) || 0;
    return total + (course.lessons ? durationHours * (completedLessons / course.lessons) : 0);
  }, 0), [lessonProgress]);
  const activityTotal = weeklyActivity.reduce((sum, item) => sum + item.completedLessons + item.certificationAttempts, 0);
  const activityMax = Math.max(1, ...weeklyActivity.map(item => item.completedLessons + item.certificationAttempts));
  const badges = [
    { id: "first", label: "Primeira Conquista", description: "Conclua seu primeiro simulador", unlocked: completedCount >= 1, icon: Medal },
    { id: "perfect", label: "Aproveitamento Excelente", description: "Acerte todas as questões de um simulador", unlocked: perfectCount >= 1, icon: Sparkles },
    { id: "specialist", label: "Especialista em IA", description: "Conclua todas as certificações disponíveis", unlocked: completedCount === interactiveCertificationsCatalog.length, icon: Trophy },
  ];
  const nextBadge = badges.find(badge => !badge.unlocked);
  const nextBadgeProgress = !nextBadge ? 100 : nextBadge.id === "first" ? 0 : nextBadge.id === "perfect" ? Math.min(100, perfectCount * 100) : Math.min(100, Math.round((completedCount / interactiveCertificationsCatalog.length) * 100));
  const displayName = profileName.trim() || baseName;
  const initials = getInitials(displayName);
  const profileShareBase = typeof window !== "undefined" ? window.location.origin : "https://ialearnhub-ndm4gtgm.manus.space";
  const publicToken = useMemo(() => createPublicProfileToken({ name: displayName, bio: profileBio, avatarDataUrl, badges: badges.filter(badge => badge.unlocked).map(badge => badge.label), certifications: certifications.map(({ cert, stats, history }) => ({ title: cert.title, issuer: cert.issuer, score: history?.scorePercentage ?? stats.scorePercentage, completedAt: history?.completedAt })) }), [displayName, profileBio, avatarDataUrl, completedCount, perfectCount]);
  const publicProfileLink = `${profileShareBase}/profile/public?token=${publicToken}`;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarDraftUrl(typeof reader.result === "string" ? reader.result : "");
      setAvatarZoom(1);
      setAvatarOffsetX(0);
      setAvatarOffsetY(0);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    const croppedAvatar = avatarDraftUrl ? await createCroppedAvatar(avatarDraftUrl, avatarZoom, avatarOffsetX, avatarOffsetY) : "";
    const nextPreferences = { name: profileName.trim(), bio: profileBio.trim(), avatarDataUrl: croppedAvatar, zoom: avatarZoom, offsetX: avatarOffsetX, offsetY: avatarOffsetY, publicEnabled: isPublicEnabled };
    writeProfilePreferences(nextPreferences);
    setAvatarDataUrl(croppedAvatar);
    setAvatarDraftUrl(croppedAvatar);
    setProfileName(nextPreferences.name || baseName);
    setProfileBio(nextPreferences.bio);
    setSavedNotice(true);
    setIsEditorOpen(false);
    window.setTimeout(() => setSavedNotice(false), 2600);
  };

  const handleCopyPublicLink = async () => {
    if (!isPublicEnabled) {
      setIsPublicEnabled(true);
      writeProfilePreferences({ ...preferences, publicEnabled: true });
    }
    try { await navigator.clipboard?.writeText(publicProfileLink); } catch { /* Link continua visível para cópia manual. */ }
    setLinkNotice(true);
    window.setTimeout(() => setLinkNotice(false), 2600);
  };

  return <div className="container py-12 space-y-10">
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-card to-secondary/10 p-8 md:p-10"><div className="absolute -right-12 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" /><div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-5"><div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary text-2xl font-black text-white shadow-lg shadow-primary/25" aria-label={`Avatar de ${displayName}`}>{avatarDataUrl ? <img src={avatarDataUrl} alt={`Avatar de ${displayName}`} className="size-full object-cover" /> : initials}</div><div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Meu perfil de aprendizagem</p><h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{displayName}</h1><p className="mt-2 max-w-xl text-muted-foreground">{profileBio || "Acompanhe suas conquistas, simulados e evolução em IA."}</p></div></div><div className="flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={() => { setAvatarDraftUrl(avatarDataUrl); setIsEditorOpen(true); }} className="gap-2"><Pencil className="size-4" /> Editar perfil</Button><Button type="button" variant={isPublicEnabled ? "default" : "outline"} onClick={handleCopyPublicLink} className="gap-2"><Globe2 className="size-4" /> {isPublicEnabled ? "Copiar perfil público" : "Criar link público"}</Button><Button asChild className="gap-2"><a href="/interactive-certifications">Continuar certificações <ArrowRight className="size-4" /></a></Button></div></div></section>
    {(savedNotice || linkNotice) && <div role="status" className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">{savedNotice ? "Perfil atualizado com sucesso neste navegador." : "Link público copiado. Compartilhe com recrutadores."}</div>}
    <ProfileStatsSection studyHours={studyHours} studyStreak={studyStreak} weeklyActivity={weeklyActivity} activityTotal={activityTotal} activityMax={activityMax} nextBadge={nextBadge} nextBadgeProgress={nextBadgeProgress} unlockedBadges={badges.filter(badge => badge.unlocked).length} totalBadges={badges.length} />
    <section className="grid gap-4 sm:grid-cols-3" aria-label="Resumo do perfil"><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="size-4 text-primary" /><span className="text-sm">Trilhas concluídas</span></div><p className="mt-3 text-3xl font-bold">{completedCount}<span className="ml-1 text-base font-normal text-muted-foreground">/ {interactiveCertificationsCatalog.length}</span></p></div><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><Trophy className="size-4 text-amber-400" /><span className="text-sm">Medalhas conquistadas</span></div><p className="mt-3 text-3xl font-bold">{badges.filter(badge => badge.unlocked).length}<span className="ml-1 text-base font-normal text-muted-foreground">/ {badges.length}</span></p></div><div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center gap-2 text-muted-foreground"><Award className="size-4 text-emerald-400" /><span className="text-sm">Aproveitamentos perfeitos</span></div><p className="mt-3 text-3xl font-bold">{perfectCount}</p></div></section>
    <section aria-labelledby="badges-heading" className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Conquistas</p><h2 id="badges-heading" className="text-2xl font-bold">Medalhas do seu percurso</h2></div><div className="grid gap-4 md:grid-cols-3">{badges.map(badge => { const Icon = badge.icon; return <article key={badge.id} className={`rounded-2xl border p-5 transition-colors ${badge.unlocked ? "border-amber-400/40 bg-amber-400/10" : "border-border bg-card opacity-60"}`}><div className="flex items-start justify-between gap-4"><div className={`grid size-11 place-items-center rounded-xl ${badge.unlocked ? "bg-amber-300/20 text-amber-300" : "bg-muted text-muted-foreground"}`}><Icon className="size-6" /></div>{badge.unlocked ? <CheckCircle2 className="size-5 text-emerald-400" aria-label="Medalha conquistada" /> : <span className="text-xs text-muted-foreground">Bloqueada</span>}</div><h3 className="mt-4 font-bold">{badge.label}</h3><p className="mt-1 text-sm text-muted-foreground">{badge.description}</p></article>; })}</div></section>
    <section aria-labelledby="history-heading" className="space-y-4"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Registro de estudos</p><h2 id="history-heading" className="text-2xl font-bold">Histórico de certificações</h2></div><span className="text-sm text-muted-foreground">{loading ? "Carregando perfil…" : `${certifications.length} registros concluídos`}</span></div>{certifications.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><UserRound className="mx-auto size-10 text-muted-foreground" /><h3 className="mt-4 text-lg font-bold">Seu histórico começará aqui</h3><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Conclua um simulador para registrar sua primeira certificação e liberar suas medalhas.</p><Button asChild className="mt-5 gap-2"><a href="/interactive-certifications">Abrir simuladores <ArrowRight className="size-4" /></a></Button></div> : <div className="space-y-3">{certifications.map(({ cert, stats, history }) => <article key={cert.id} className="rounded-2xl border border-border bg-card p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="size-6" /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-primary">{cert.issuer} · {cert.level}</p><h3 className="mt-1 font-bold">{cert.title}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatCompletionDate(history?.completedAt)}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> {cert.durationHours}h estimadas</span><span>{history?.attempts ?? 1} tentativa(s)</span></div></div></div><div className="text-left md:text-right"><p className="text-xs text-muted-foreground">Aproveitamento</p><p className="text-2xl font-bold text-emerald-400">{history?.scorePercentage ?? stats.scorePercentage}%</p><p className="text-xs text-muted-foreground">{history?.correctCount ?? stats.correctCount} de {cert.quiz.length} questões</p><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${profileShareBase}/profile/public?token=${publicToken}&certification=${cert.id}`)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"><Linkedin className="size-3.5" /> Compartilhar no LinkedIn</a></div></div></article>)}</div>}</section>
    <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}><DialogContent><DialogHeader><DialogTitle>Editar meu perfil</DialogTitle><DialogDescription>Atualize os dados pessoais e centralize seu avatar antes de salvar.</DialogDescription></DialogHeader><div className="space-y-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white"><div className="size-full bg-cover bg-center" style={{ backgroundImage: avatarDraftUrl ? `url(${avatarDraftUrl})` : undefined, transform: `scale(${avatarZoom}) translate(${avatarOffsetX / 4}px, ${avatarOffsetY / 4}px)` }}>{!avatarDraftUrl && initials}</div></div><div className="space-y-2"><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"><Upload className="size-4" /> Escolher avatar<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatarChange} className="sr-only" /></label><p className="text-xs text-muted-foreground">PNG, JPEG ou WebP de até 2 MB.</p></div></div>{avatarDraftUrl && <div className="space-y-3 rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 text-sm font-semibold"><ZoomIn className="size-4 text-primary" /> Zoom e centralização</div><label className="block text-xs font-medium">Zoom<input aria-label="Ajustar zoom do avatar" type="range" min="1" max="2.5" step="0.1" value={avatarZoom} onChange={event => setAvatarZoom(Number(event.target.value))} className="mt-2 w-full accent-primary" /></label><label className="block text-xs font-medium">Horizontal<input aria-label="Ajustar posição horizontal do avatar" type="range" min="-120" max="120" value={avatarOffsetX} onChange={event => setAvatarOffsetX(Number(event.target.value))} className="mt-2 w-full accent-primary" /></label><label className="block text-xs font-medium">Vertical<input aria-label="Ajustar posição vertical do avatar" type="range" min="-120" max="120" value={avatarOffsetY} onChange={event => setAvatarOffsetY(Number(event.target.value))} className="mt-2 w-full accent-primary" /></label><p className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Move className="size-3.5" /> Ajuste a posição para centralizar o rosto.</p></div>}<label className="block text-sm font-medium">Nome<input value={profileName} onChange={event => setProfileName(event.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary" /></label><label className="block text-sm font-medium">Biografia breve<textarea value={profileBio} onChange={event => setProfileBio(event.target.value)} maxLength={180} rows={4} placeholder="Conte em uma frase o que você está estudando em IA..." className="mt-1 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-primary" /></label><label className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm"><input type="checkbox" checked={isPublicEnabled} onChange={event => setIsPublicEnabled(event.target.checked)} className="mt-1 size-4 accent-primary" /><span><strong>Permitir perfil público</strong><span className="mt-1 block text-xs text-muted-foreground">Recrutadores verão nome, biografia, medalhas e certificações concluídas. Email e estatísticas privadas não são publicados.</span></span></label></div><DialogFooter><Button type="button" variant="outline" onClick={() => setIsEditorOpen(false)}>Cancelar</Button><Button type="button" onClick={handleSaveProfile} className="gap-2"><Save className="size-4" /> Salvar perfil</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
