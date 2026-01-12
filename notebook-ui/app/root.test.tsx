import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./root";

describe("App-component", () => {
  it("should render successfully", () => {
    expect(render(<App />).baseElement).toBeTruthy();
  });
});
