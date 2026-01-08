import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import Topbar from "~/components/topbar/Topbar";

describe("Topbar-component test", () => {
  it("should render successfully", () => {
    render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>,
    );
    expect(screen.getByText("Formula Notebook")).toBeInTheDocument();
  });
});
