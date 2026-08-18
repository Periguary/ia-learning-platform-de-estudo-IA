import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export default function PageTransitionLoader() {
  const [location] = useLocation();
  const firstLocation = useRef(location);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (firstLocation.current === location) return;
    firstLocation.current = location;
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(timeout);
  }, [location]);

  if (!isLoading) return null;

  return (
    <div className="hud-page-loader" role="status" aria-live="polite" aria-label="Carregando próxima página">
      <div className="hud-page-loader__panel">
        <div className="flex items-center gap-4">
          <div className="hud-page-loader__reticle" aria-hidden="true" />
          <div>
            <p className="futurist-kicker">ROUTING // ONLINE</p>
            <p className="mt-1 text-sm font-bold uppercase tracking-wider text-foreground">Sincronizando módulo</p>
            <p className="mt-1 text-xs text-muted-foreground">Preparando o próximo ambiente de aprendizagem.</p>
          </div>
        </div>
        <div className="hud-page-loader__bar mt-5" aria-hidden="true" />
      </div>
    </div>
  );
}
