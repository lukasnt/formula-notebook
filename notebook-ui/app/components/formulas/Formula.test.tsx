import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FormulaRoot } from "~/components/formulas/Formula";
import { testInputs } from "~/state/formula-const";
import { v4 } from "uuid";
import { Provider } from "react-redux";
import { store } from "~/state/store";

describe("Formula-component", () => {
  const formulaId = v4();
  let element: HTMLElement;

  beforeEach(() => {
    element = render(
      <MemoryRouter>
        <Provider store={store}>
          <FormulaRoot id={formulaId} inputs={testInputs} operator="MINUS" />
        </Provider>
      </MemoryRouter>,
    ).baseElement;
  });

  it("should render correctly", () => {
    expect(screen.queryAllByText("20")).toHaveLength(4);
    expect(screen.queryAllByText("5")).toHaveLength(1);
    expect(screen.queryAllByText("6")).toHaveLength(1);
    expect(screen.queryAllByText("10")).toHaveLength(0);
    expect(screen.queryAllByText("+")).toHaveLength(2);
    expect(screen.queryAllByText("-")).toHaveLength(1);
  });
});
