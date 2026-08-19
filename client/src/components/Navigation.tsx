import React, { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { AIGlossary } from "@/components/AIGlossary";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Trilha de Aprendizado", href: "/learning-path" },
    { label: "Projetos", href: "/projects" },
    { label: "Carreira", href: "/careers" },
    { label: "Certificações", href: "/certifications" },
    { label: "Certif. Interativa", href: "/interactive-certifications" },
    { label: "Curiosidades", href: "/curiosities" },
    { label: "Biblioteca", href: "/library" },
    { label: "Vídeos", href: "/videos" },
    { label: "Especializações", href: "/specializations" },
    { label: "Radar de IA", href: "/updates" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full futurist-nav backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 font-bold text-xl gradient-text bg-transparent border-none cursor-pointer nav-button tracking-tight"
        >
          <div className="relative w-9 h-9 bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_24px_hsla(var(--primary),0.45)]">
            <span className="text-[hsl(var(--primary-foreground))] font-black text-sm tracking-tighter">AI</span>
          </div>
          <span>IA Academy</span>
        </button>

        {/* Desktop Navigation */}
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <AIGlossary />
          {/* Search Bar */}
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
                placeholder="Buscar conteúdos de IA"
                aria-label="Buscar conteúdos de IA"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className={`p-2 border border-transparent transition-colors hover:border-primary/35 hover:bg-primary/10 ${searchOpen ? "border-primary/40 bg-primary/10 text-primary" : ""}`}
            aria-label="Abrir busca de conteúdos"
          >
            <Search className="size-5 text-muted-foreground" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-transparent hover:border-primary/35 hover:bg-primary/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer futurist-nav-item"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/saved-explanations")}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-primary bg-transparent border-none cursor-pointer futurist-nav-item"
                title="Minhas Explicações Salvas"
              >
                Explicações Salvas
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer futurist-nav-item"
              >
                Perfil
              </button>
              <button
                onClick={() => logout()}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Button
              asChild
              size="sm"
              className="futurist-button border-0"
            >
              <a href={getLoginUrl()}>Entrar</a>
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-transparent hover:border-primary/35 hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer w-full text-left futurist-nav-item"
              >
                {item.label}
              </button>
            ))}
            {user && (
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground bg-transparent border-none cursor-pointer w-full text-left futurist-nav-item"
              >
                Perfil
              </button>
            )}
            {!user && (
              <Button
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                <a href={getLoginUrl()}>Entrar</a>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
