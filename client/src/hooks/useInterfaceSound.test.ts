// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { playInterfaceSound } from "./useInterfaceSound";

describe("useInterfaceSound", () => {
  it("não lança exceção quando o som está desativado ou Web Audio não existe", () => {
    window.localStorage.setItem("ia-academy-profile-preferences", JSON.stringify({ soundEnabled: false, soundVolume: 0.5 }));
    expect(() => playInterfaceSound("button")).not.toThrow();
    expect(() => playInterfaceSound("achievement", { enabled: true, volume: 0 })).not.toThrow();
    vi.restoreAllMocks();
  });
});
