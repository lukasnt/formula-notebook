import type { WritableDraft } from "immer";
import type { NotebookState } from "~/state/notebook-slices";
import type { CellData } from "~/api/types/notebook-data";
import type { CellProps } from "~/components/notebook/Cell";

export const onlyData = (props: CellProps): CellData => {
  return {
    notebookId: props.notebookId,
    cellId: props.cellId,
    updated: props.updated,
    symbol: props.symbol,
    formula: props.formula,
    textContent: props.textContent,
    evaluated: { ...props.evaluated },
  };
};

export const findCell = (
  state: WritableDraft<NotebookState>,
  cellId: string,
) => {
  return state.cells.find((cell) => cell.cellId === cellId);
};
