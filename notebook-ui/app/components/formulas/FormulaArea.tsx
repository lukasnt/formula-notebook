import { FormulaRoot } from "~/components/formulas/Formula";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useEffect, useState } from "react";
import { setSelectedCell } from "~/state/notebook-slices";
import { createEmptyFormula } from "~/state/formula-const";
import "./formula.css";

export interface FormulaAreaProps {
  cellId: string;
}

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

  return (
    <div
      style={{ fontSize: 25, fontFamily: "Latin Modern Math" }}
      onClick={() => {
        dispatch(setSelectedCell(cellId));
      }}
    >
      <FormulaRoot
        {...formula}
        selected={{
          id: selectedFormula.id,
          depth: 0,
        }}
      />
    </div>
  );
}
