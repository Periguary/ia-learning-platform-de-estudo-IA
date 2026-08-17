// @vitest-environment jsdom
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InteractiveCertifications from "./InteractiveCertifications";

const navigate = vi.fn();
vi.mock("wouter", () => ({
  useLocation: () => ["/interactive-certifications", navigate],
}));

describe("InteractiveCertifications page", () => {
  it("renderiza o componente de certificações interativas", () => {
    const { container } = render(<InteractiveCertifications />);
    expect(container).toBeTruthy();
  });
});
