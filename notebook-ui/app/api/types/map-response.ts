import type { NotebookResponse } from "~/api/types/notebook-response";
import type { NotebookProps } from "~/components/notebook/Notebook";

export const toNotebook = (response: NotebookResponse): NotebookProps => {
  return {
    ...response,
    created: response.created,
    modified: response.modified,
    cellCount: response.cells.length,
  };
};
