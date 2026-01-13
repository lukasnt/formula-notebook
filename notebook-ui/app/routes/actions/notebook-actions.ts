import {
  clearOutput,
  createNotebook,
  deleteCell,
  deleteNotebook,
  postCell,
  runAllCells,
  runCell,
  saveNotebook,
} from "~/api/services/notebook-service";
import type { CellData, NotebookData } from "~/api/types/notebook-data";

export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK";
export const SAVE_NOTEBOOK = "SAVE_NOTEBOOK";
export const RUN_ALL_CELLS = "RUN_ALL_CELLS";
export const CLEAR_OUTPUT = "CLEAR_OUTPUT";
export const DELETE_NOTEBOOK = "DELETE_NOTEBOOK";
export const ADD_CELL = "ADD_CELL";
export const DELETE_CELL = "DELETE_CELL";
export const RUN_CELL = "RUN_CELL";

export interface NotebookAction {
  actionType: string;
  cellData?: CellData;
  notebookData?: NotebookData;
  deleted?: boolean;
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
        deleted: await deleteCell(notebookId, formData.get("cellId") as string),
      };
    case SAVE_NOTEBOOK:
      return {
        actionType: actionType,
        notebookData: await saveNotebook(
          notebookId,
          formData.get("notebook") as string,
        ),
      };
    case RUN_ALL_CELLS:
      return {
        actionType: actionType,
        notebookData: await runAllCells(
          notebookId,
          formData.get("notebook") as string,
        ),
      };
    case CLEAR_OUTPUT:
      return {
        actionType: actionType,
        notebookData: await clearOutput(
          notebookId,
          formData.get("notebook") as string,
        ),
      };
    case DELETE_NOTEBOOK:
      return {
        actionType: actionType,
        deleted: await deleteNotebook(formData.get("notebookId") as string),
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
