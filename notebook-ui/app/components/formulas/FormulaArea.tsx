import { FormulaRoot } from "~/components/formulas/Formula";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useLoaderData } from "react-router";
import type { loader } from "~/routes/notebook";
import { useEffect, useState } from "react";
import { setRootFormula } from "~/state/notebook-slices";

export interface FormulaAreaProps {
  cellId: string;
}

export default function FormulaArea({ cellId }: FormulaAreaProps) {
  const { notebook } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  const cell = notebook.cells.find((cell) => cell.cellId === cellId);

  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  const rootFormula = useSelector(
    (state: RootState) => state.notebook.rootFormula,
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
