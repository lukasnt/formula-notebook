import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./root";

describe("App-component test", () => {
  it("should render successfully", () => {
    // @ts-ignore
    expect(render(<App />).baseElement).toBeTruthy();
  });
});
