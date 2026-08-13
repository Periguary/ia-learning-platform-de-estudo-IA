import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Trilha de Aprendizado", href: "/learning-path" },
    { label: "Projetos", href: "/projects" },
    { label: "Carreira", href: "/careers" },
    { label: "Certificações", href: "/certifications" },
    { label: "Curiosidades", href: "/curiosities" },
    { label: "Biblioteca", href: "/library" },
    { label: "Vídeos", href: "/videos" },
    { label: "Radar de IA", href: "/updates" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-bold text-xl gradient-text bg-transparent border-none cursor-pointer nav-button"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <span>IA Academy</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="text-sm font-medium text-muted-foreground bg-transparent border-none cursor-pointer nav-underline color-transition"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
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
                className="text-sm font-medium text-muted-foreground bg-transparent border-none cursor-pointer nav-underline color-transition"
              >
                Dashboard
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
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
            >
              <a href={getLoginUrl()}>Entrar</a>
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
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
                className="text-sm font-medium text-muted-foreground bg-transparent border-none cursor-pointer w-full text-left nav-button color-transition"
              >
                {item.label}
              </button>
            ))}
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
