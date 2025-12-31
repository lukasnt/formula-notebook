import type { NotebookData } from "~/api/types/notebook-data";
import type { NotebookState } from "~/state/notebook-slices";

export const onlyData = (state: NotebookState): NotebookData => {
  return {
    notebookId: state.notebookId,
    title: state.title,
    created: state.created,
    modified: state.modified,
    cells: state.cells,
    cellCount: state.cellCount,
  };
};
