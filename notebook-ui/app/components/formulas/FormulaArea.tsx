import { FormulaRoot } from "~/components/formulas/Formula";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useEffect, useState } from "react";
import {
  replaceAtSelected,
  setSelectedCell,
} from "~/state/notebook-slices";
import { createEmptyFormula } from "~/state/formula-const";
import "./formula.css";
import useGlobalKeyPress from "~/hooks/global-key-press";

export interface FormulaAreaProps {
  cellId: string;
}

export const NUMBER_KEYS: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

export default function FormulaArea({ cellId }: FormulaAreaProps) {
  const dispatch = useDispatch();

  const cell = useSelector((state: RootState) =>
    state.notebook.cells.find((cell) => cell.cellId === cellId),
  );

  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  const [formula, setFormula] = useState(
    cell?.formula ? cell.formula : createEmptyFormula(),
  );

  useEffect(() => {
    setFormula(cell?.formula ? cell.formula : createEmptyFormula());
  }, [cell]);

  useGlobalKeyPress(
    NUMBER_KEYS,
    (e) => {
      if (selectedFormula && selectedFormula.operator !== "INPUT") {
        dispatch(
          replaceAtSelected({
            ...selectedFormula,
            operator: "INPUT",
            value: { num: parseInt(e.key) },
            inputs: []
          }),
        );
      }
    },
    { requireAll: false },
  );

  return (
    <div
      style={{
        fontSize: 25,
        fontFamily: "Latin Modern Math",
        fontWeight: "bold",
      }}
      onClick={() => {
        dispatch(setSelectedCell(cellId));
      }}
    >
      <FormulaRoot
        {...formula}
        selected={{
          id: selectedFormula?.id,
          depth: 0,
        }}
      />
    </div>
  );
}
