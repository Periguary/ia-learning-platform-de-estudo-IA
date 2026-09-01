// @vitest-environment jsdom
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const mutate = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/certifications", vi.fn()],
}));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: 1, name: "Aluno", email: "aluno@example.com" }, loading: false }),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    externalLearning: {
      progress: { useQuery: () => ({ data: [], refetch: vi.fn() }) },
      toggleProgress: { useMutation: () => ({ mutate, isPending: false }) },
    },
  },
}));

describe("Certifications free learning controls", () => {
  it("filters by provider and sends a user-scoped completion toggle", async () => {
    const { default: Certifications } = await import("./Certifications");
    render(<Certifications />);

    fireEvent.change(screen.getByLabelText("Provedor"), { target: { value: "Microsoft Learn" } });
    expect(screen.getByText("AI concepts for developers and technology professionals")).toBeTruthy();
    expect(screen.queryByText("Beginner: Introduction to Generative AI")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Marcar AI concepts/i }));
    expect(mutate).toHaveBeenCalledWith(expect.objectContaining({ resourceId: "microsoft-ai-foundations", completed: true }));
  });
});
