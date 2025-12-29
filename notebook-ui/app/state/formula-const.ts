import type { FormulaProps } from "~/components/formulas/Formula";

export const emptyFormula = {
  id: "",
  operator: "",
  inputs: [],
};

export const testInputs: FormulaProps[] = [
  {
    id: "1",
    operator: "PLUS",
    inputs: [
      {
        id: "2",
        operator: "DIVISION",
        inputs: [
          {
            id: "3",
            operator: "DIVISION",
            inputs: [
              {
                id: "4",
                operator: "PLUS",
                value: { num: 10 },
                inputs: [
                  {
                    id: "5",
                    operator: "CONSTANT",
                    value: { num: 5 },
                    inputs: [],
                  },
                  {
                    id: "6",
                    operator: "CONSTANT",
                    value: { num: 6 },
                    inputs: [],
                  },
                ],
              },
              {
                id: "7",
                operator: "CONSTANT",
                value: { num: 20 },
                inputs: [],
              },
            ],
          },
          {
            id: "8",
            operator: "CONSTANT",
            value: { num: 20 },
            inputs: [],
          },
        ],
      },
      { id: "9", operator: "CONSTANT", value: { num: 20 }, inputs: [] },
    ],
  },
  {
    id: "10",
    operator: "CONSTANT",
    value: { num: 20 },
    inputs: [],
  },
];

export const initialCellFormula: FormulaProps = {
  cellId: "",
  id: "0",
  operator: "PLUS",
  inputs: testInputs,
};

