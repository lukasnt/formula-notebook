import type { WritableDraft } from "immer";
import type { NotebookState } from "~/state/notebook-slices";

export const findCell = (state: WritableDraft<NotebookState>, cellId: string) => {
  return state.cells.find((cell) => cell.cellId === cellId);
};


