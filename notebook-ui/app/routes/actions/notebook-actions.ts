import {
  createNotebook,
  deleteCell,
  postCell,
  runCell,
  saveNotebook,
} from "~/api/services/notebook-service";
import type { CellData, NotebookData } from "~/api/types/notebook-data";

export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK";
export const SAVE_NOTEBOOK = "SAVE_NOTEBOOK";
export const ADD_CELL = "ADD_CELL";
export const DELETE_CELL = "DELETE_CELL";
export const RUN_CELL = "RUN_CELL";

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
    case CREATE_NOTEBOOK:
      return {
        actionType: actionType,
        notebookData: await createNotebook(),
      };
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
        notebookData: await saveNotebook(
          notebookId,
          formData.get("notebook") as string,
        ),
      };
    case RUN_CELL:
      return {
        actionType: actionType,
        cellData: await runCell(
          notebookId,
          formData.get("cellId") as string,
          formData.get("cell") as string,
        ),
      };
    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
};
