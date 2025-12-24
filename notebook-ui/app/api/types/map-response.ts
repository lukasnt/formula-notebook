import type { NotebookResponse } from "~/api/types/notebook-response";
import type { NotebookData } from "~/components/notebook/Notebook";

export const toNotebook = (response: NotebookResponse): NotebookData => {
  return {
    ...response,
    created: response.created,
    modified: response.modified,
    cellCount: response.cells.length,
  };
};
