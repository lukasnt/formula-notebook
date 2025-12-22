import type { NotebookResponse } from "~/api/types/notebook-response";
import type { NotebookProps } from "~/components/notebook/Notebook";

export const toNotebook = (response: NotebookResponse): NotebookProps => {
  return {
    ...response,
    created: new Date(response.created),
    modified: new Date(),
    cellCount: response.cells.length,
  };
};