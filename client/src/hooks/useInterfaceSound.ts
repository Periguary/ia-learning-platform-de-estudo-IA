import { useCallback } from "react";
import { readProfilePreferences } from "@/data/profile";

type InterfaceSound = "button" | "achievement";

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return null;
    audioContext = new AudioContextConstructor();
  }
  return audioContext;
}

export function playInterfaceSound(sound: InterfaceSound, overrides?: { enabled?: boolean; volume?: number }) {
  const preferences = readProfilePreferences();
  const enabled = overrides?.enabled ?? preferences.soundEnabled ?? false;
  const volume = Math.max(0, Math.min(1, overrides?.volume ?? preferences.soundVolume ?? 0.35));
  if (!enabled || volume === 0) return;

  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") void context.resume();

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = sound === "achievement" ? "triangle" : "sine";
  oscillator.frequency.setValueAtTime(sound === "achievement" ? 660 : 420, now);
  oscillator.frequency.exponentialRampToValueAtTime(sound === "achievement" ? 1040 : 540, now + (sound === "achievement" ? 0.18 : 0.08));
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * (sound === "achievement" ? 0.16 : 0.08)), now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (sound === "achievement" ? 0.32 : 0.14));
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + (sound === "achievement" ? 0.34 : 0.16));
}

export function useInterfaceSound() {
  return {
    playButton: useCallback(() => playInterfaceSound("button"), []),
    playAchievement: useCallback(() => playInterfaceSound("achievement"), []),
  };
}
