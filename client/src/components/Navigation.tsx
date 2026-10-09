import React, { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { AIGlossary } from "@/components/AIGlossary";
import { UserProfileSummary } from "@/components/UserProfileSummary";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const navItems = [
    { label: t("nav.learningPath"), href: "/learning-path" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.careers"), href: "/careers" },
    { label: t("nav.certifications"), href: "/certifications" },
    { label: t("nav.interactiveCertifications"), href: "/interactive-certifications" },
    { label: t("nav.curiosities"), href: "/curiosities" },
    { label: t("nav.library"), href: "/library" },
    { label: t("nav.videos"), href: "/videos" },
    { label: t("nav.specializations"), href: "/specializations" },
    { label: t("nav.lab"), href: "/challenges" },
    { label: t("nav.radar"), href: "/updates" },
    { label: t("nav.support"), href: "/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full futurist-nav backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 font-bold text-xl gradient-text bg-transparent border-none cursor-pointer nav-button tracking-tight"
        >
          <div className="relative w-9 h-9 bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_24px_hsla(var(--primary),0.45)]">
            <span className="text-[hsl(var(--primary-foreground))] font-black text-sm tracking-tighter">AI</span>
          </div>
          <span>IA Academy</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer futurist-nav-item"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <AIGlossary />
          {searchOpen && (
            <form
              className="hidden sm:flex items-center gap-2 border border-primary/35 bg-card/90 px-3 py-1.5 shadow-[0_0_18px_hsla(var(--primary),0.12)]"
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`/library${searchQuery.trim() ? `?query=${encodeURIComponent(searchQuery.trim())}` : ""}`);
              }}
            >
              <Search className="size-4 text-primary" aria-hidden="true" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("nav.searchLabel")}
                className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className={`p-2 border border-transparent transition-colors hover:border-primary/35 hover:bg-primary/10 ${searchOpen ? "border-primary/40 bg-primary/10 text-primary" : ""}`}
            aria-label={t("nav.openSearch")}
          >
            <Search className="size-5 text-muted-foreground" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 border border-transparent hover:border-primary/35 hover:bg-primary/10 transition-colors"
            aria-label={t("nav.toggleTheme")}
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
          </button>

          <label className="sr-only" htmlFor="language-selector">{t("nav.languageLabel")}</label>
          <select
            id="language-selector"
            aria-label={t("nav.languageLabel")}
            value={language}
            onChange={event => setLanguage(event.target.value as "pt-BR" | "en")}
            className="hidden sm:block border border-primary/25 bg-card px-2 py-1.5 text-xs font-semibold text-foreground outline-none transition-colors hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="pt-BR">PT-BR</option>
            <option value="en">EN</option>
          </select>

          {user ? (
            <div className="flex items-center gap-3">
              <UserProfileSummary name={user.name} email={user.email} onOpen={() => navigate("/profile")} />
              <button onClick={() => navigate("/dashboard")} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer futurist-nav-item">
                {t("nav.dashboard")}
              </button>
              <button onClick={() => navigate("/saved-explanations")} className="text-xs font-semibold uppercase tracking-[0.12em] text-primary bg-transparent border-none cursor-pointer futurist-nav-item" title={t("nav.savedExplanations")}>
                {t("nav.savedExplanations")}
              </button>
              <button onClick={() => navigate("/profile")} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer futurist-nav-item">
                {t("nav.profile")}
              </button>
              <button onClick={() => logout()} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <Button asChild size="sm" className="futurist-button border-0">
              <a href={getLoginUrl()}>{t("nav.login")}</a>
            </Button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-transparent hover:border-primary/35 hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-4">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground" htmlFor="mobile-language-selector">{t("nav.languageLabel")}
              <select id="mobile-language-selector" aria-label={t("nav.languageLabel")} value={language} onChange={event => setLanguage(event.target.value as "pt-BR" | "en")} className="ml-3 border border-primary/25 bg-background px-2 py-1 text-xs text-foreground">
                <option value="pt-BR">PT-BR</option>
                <option value="en">EN</option>
              </select>
            </label>
            {navItems.map((item) => (
              <button key={item.href} onClick={() => { navigate(item.href); setIsOpen(false); }} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer w-full text-left futurist-nav-item">
                {item.label}
              </button>
            ))}
            {user && (
              <button onClick={() => { navigate("/profile"); setIsOpen(false); }} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer w-full text-left futurist-nav-item">
                {t("nav.profile")}
              </button>
            )}
            {!user && (
              <Button asChild size="sm" className="w-full bg-gradient-to-r from-primary to-secondary">
                <a href={getLoginUrl()}>{t("nav.login")}</a>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
