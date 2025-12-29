import { FormulaRoot } from "~/components/formulas/Formula";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/providers/store";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/notebook";
import { useEffect, useState } from "react";
import { setRootFormula } from "~/providers/formula-slices";

export interface FormulaAreaProps {
  cellId: string;
}

export default function FormulaArea({ cellId }: FormulaAreaProps) {
  const { notebook } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  const cell = notebook.cells.find((cell) => cell.cellId === cellId);

  const selectedFormula = useSelector(
    (state: RootState) => state.selectedFormula.selectedFormula,
  );

  const rootFormula = useSelector(
    (state: RootState) => state.selectedFormula.rootFormula,
  );

  const [formula, setFormula] = useState(
    cell?.formula ? cell.formula : rootFormula,
  );

  useEffect(() => {
    setFormula(cell?.formula ? cell.formula : rootFormula);
  }, [rootFormula]);

  return (
    <div
      style={{ fontSize: 25 }}
      onClick={() => {
        console.log("root formula:", rootFormula);
        dispatch(setRootFormula(formula));
      }}
    >
      <FormulaRoot
        {...formula}
        selected={{
          id: selectedFormula.id,
          depth: selectedFormula.depth || 0,
        }}
      />
    </div>
  );
}
