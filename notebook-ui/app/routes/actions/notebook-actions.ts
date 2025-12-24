import {
  deleteCell,
  postCell,
  saveNotebook,
} from "~/api/services/notebook-service";
import type { CellData } from "~/components/notebook/Cell";
import type { NotebookData } from "~/components/notebook/Notebook";
import { toNotebook } from "~/api/types/map-response";

export const SAVE_NOTEBOOK = "SAVE_NOTEBOOK";
export const ADD_CELL = "ADD_CELL";
export const DELETE_CELL = "DELETE_CELL";
export const UPDATE_CELL = "UPDATE_CELL";

export interface NotebookAction {
  actionType: string;
  cellData?: CellData;
  notebookData?: NotebookData;
}

export const executeAction = async (
  actionType: string,
  notebookId: string,
  formData: FormData,
) => {
  switch (actionType) {
    case ADD_CELL:
      return {
        actionType: actionType,
        cellData: await postCell(notebookId, formData.get("cell") as string),
      };
    case DELETE_CELL:
      return {
        actionType: actionType,
        cellData: await deleteCell(
          notebookId,
          formData.get("cellId") as string,
        ),
      };
    case SAVE_NOTEBOOK:
      return {
        actionType: actionType,
        notebookData: toNotebook(
          await saveNotebook(notebookId, formData.get("notebook") as string),
        ),
      };
    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
};
