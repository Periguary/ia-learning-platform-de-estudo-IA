// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const navigate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/specializations", navigate],
}));

import Specializations from "./Specializations";

describe("Specializations interaction", () => {
  it("filtra áreas por ferramenta e exibe os resultados correspondentes", () => {
    const { container } = render(<Specializations />);

    const searchInput = container.querySelector("input[type='search']") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Docker" } });

    expect(screen.getByRole("heading", { name: /DevOps & MLOps/i })).toBeTruthy();
  });
});
