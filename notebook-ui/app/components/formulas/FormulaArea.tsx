import { type FormulaProps, FormulaRoot } from "~/components/formulas/Formula";

const testInputs: FormulaProps[] = [
  {
    id: "1",
    operator: "ADD",
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
                operator: "ADD",
                value: 10,
                inputs: [
                  {
                    id: "5",
                    operator: "CONSTANT",
                    value: 5,
                    inputs: [],
                  },
                  {
                    id: "6",
                    operator: "CONSTANT",
                    value: 6,
                    inputs: [],
                  },
                ],
              },
              {
                id: "7",
                operator: "CONSTANT",
                value: 20,
                inputs: [],
              },
            ],
          },
          {
            id: "8",
            operator: "CONSTANT",
            value: 20,
            inputs: [],
          },
        ],
      },
      { id: "9", operator: "CONSTANT", value: 20, inputs: [] },
    ],
  },
  {
    id: "10",
    operator: "CONSTANT",
    value: 20,
    inputs: [],
  },
];

export default function FormulaArea() {
  return (
    <div style={{ fontSize: 25 }}>
      <FormulaRoot id={"1"} operator={"ADD"} inputs={testInputs} />
    </div>
  );
}
