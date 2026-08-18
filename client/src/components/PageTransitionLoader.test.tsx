// @vitest-environment jsdom
import React from "react";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PageTransitionLoader from "./PageTransitionLoader";

let currentLocation = "/";

vi.mock("wouter", () => ({
  useLocation: () => [currentLocation, vi.fn()],
}));

describe("PageTransitionLoader", () => {
  beforeEach(() => {
    currentLocation = "/";
    vi.useFakeTimers();
  });

  it("exibe o painel HUD quando a rota muda e o remove após a transição", () => {
    const view = render(<PageTransitionLoader />);
    currentLocation = "/dashboard";
    view.rerender(<PageTransitionLoader />);

    expect(screen.getByRole("status", { name: /Carregando próxima página/i })).toBeTruthy();
    expect(screen.getByText("Sincronizando módulo")).toBeTruthy();

    act(() => vi.advanceTimersByTime(420));
    expect(screen.queryByRole("status", { name: /Carregando próxima página/i })).toBeNull();
  });
});
