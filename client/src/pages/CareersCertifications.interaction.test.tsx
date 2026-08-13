// @vitest-environment jsdom

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const navigate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/careers", navigate],
}));

describe("Career and certification navigation", () => {
  beforeEach(() => {
    navigate.mockReset();
  });

  it("navigates from a career card to its real detail route", async () => {
    const { default: Careers } = await import("./Careers");
    render(<Careers />);

    const careerButtons = screen
      .getAllByRole("button")
      .filter((button) => {
        const label = button.textContent ?? "";
        return label.includes("Explorar") && !label.includes("Trilha de Aprendizado");
      });
    expect(careerButtons).toHaveLength(6);

    fireEvent.click(careerButtons[1]);
    expect(navigate).toHaveBeenCalledWith("/career/2");
  });

  it("exposes official external links for every certification card", async () => {
    const { default: Certifications } = await import("./Certifications");
    render(<Certifications />);

    const links = screen.getAllByRole("link", { name: /Saiba Mais/i });
    expect(links).toHaveLength(6);
    for (const link of links) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
    }
  });
});
