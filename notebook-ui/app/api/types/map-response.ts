import type { Notebook } from "~/components/notebook-collection/NotebookCollection";
import type { NotebookResponse } from "~/api/types/notebook-response";

export const toNotebook = (response: NotebookResponse): Notebook => {
  return {
    ...response,
    created: new Date(response.created),
    modified: new Date(),
    cellCount: response.cells.length
  }
};