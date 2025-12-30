import type { RootState } from "~/state/store";

export const selectCell = (cellId: string) => {
  return (state: RootState) => state.notebook.cells.find(cell => cell.cellId === cellId);
}

export const selectCellFormula = (cellId: string) => {
  return (state: RootState) => selectCell(cellId).apply(this, [state])?.formula;
}