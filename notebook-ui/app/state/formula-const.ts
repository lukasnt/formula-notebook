import type { FormulaData } from "~/api/types/notebook-data";
import { v4 } from "uuid";

export const createEmptyConst = (): FormulaData => {
  return {
    id: v4(),
    operator: "INPUT",
    value: { num: 20 },
    inputs: [],
  };
};

export const createEmptyFormula = (): FormulaData => {
  return {
    id: v4(),
    operator: "INPUT",
    value: { num: 20 },
    inputs: [],
  };
};

export const nullFormula: FormulaData = {
  id: "",
  operator: "",
  inputs: [],
};

export const testInputs: FormulaData[] = [
  {
    id: "1",
    operator: "PLUS",
    inputs: [
      {
        id: "2",
        operator: "DIV",
        inputs: [
          {
            id: "3",
            operator: "DIV",
            inputs: [
              {
                id: "4",
                operator: "PLUS",
                value: { num: 10 },
                inputs: [
                  {
                    id: "5",
                    operator: "CONST",
                    value: { num: 5 },
                    inputs: [],
                  },
                  {
                    id: "6",
                    operator: "CONST",
                    value: { num: 6 },
                    inputs: [],
                  },
                ],
              },
              {
                id: "7",
                operator: "CONST",
                value: { num: 20 },
                inputs: [],
              },
            ],
          },
          {
            id: "8",
            operator: "CONST",
            value: { num: 20 },
            inputs: [],
          },
        ],
      },
      { id: "9", operator: "CONST", value: { num: 20 }, inputs: [] },
    ],
  },
  {
    id: "10",
    operator: "CONST",
    value: { num: 20 },
    inputs: [],
  },
];

export const testFormula: FormulaData = {
  cellId: "",
  id: "0",
  operator: "PLUS",
  inputs: testInputs,
};
