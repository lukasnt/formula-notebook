import { type FormulaProps, FormulaRoot } from "~/components/formulas/Formula";
import { useSelector } from "react-redux";
import type { RootState } from "~/providers/store";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/notebook";

const testInputs: FormulaProps[] = [
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
                value: {num: 10},
                inputs: [
                  {
                    id: "5",
                    operator: "CONSTANT",
                    value: {num: 5},
                    inputs: [],
                  },
                  {
                    id: "6",
                    operator: "CONSTANT",
                    value: {num: 6},
                    inputs: [],
                  },
                ],
              },
              {
                id: "7",
                operator: "CONSTANT",
                value: {num: 20},
                inputs: [],
              },
            ],
          },
          {
            id: "8",
            operator: "CONSTANT",
            value: {num: 20},
            inputs: [],
          },
        ],
      },
      { id: "9", operator: "CONSTANT", value: {num: 20}, inputs: [] },
    ],
  },
  {
    id: "10",
    operator: "CONSTANT",
    value: {num: 20},
    inputs: [],
  },
];

export interface FormulaAreaProps {
  cellId: string;
}

export default function FormulaArea({ cellId }: FormulaAreaProps) {
  const selectedFormula = useSelector((state: RootState) => state.formula);

  const { notebook } = useLoaderData<typeof loader>();

  const cell = notebook.cells.find(cell => cell.cellId === cellId);

  console.log(cell);

  return (
    <div style={{ fontSize: 25 }}>
      <FormulaRoot
        id={cell?.formula ? cell?.formula.id : "-1"}
        operator={cell?.formula ? cell?.formula.operator : "PLUS"}
        inputs={cell?.formula ? cell?.formula.inputs : testInputs}
        selected={{ id: selectedFormula.id, depth: selectedFormula.depth || 0 }}
      />
    </div>
  );
}
