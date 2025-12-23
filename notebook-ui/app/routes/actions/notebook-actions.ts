import { deleteCell, postCell } from "~/api/services/notebook-service";

export const SAVE_NOTEBOOK = "SAVE_NOTEBOOK";
export const ADD_CELL = "ADD_CELL";
export const DELETE_CELL = "DELETE_CELL";
export const UPDATE_CELL = "UPDATE_CELL";

export const executeAction = (
  actionType: string,
  notebookId: string,
  formData: FormData,
) => {
  switch (actionType) {
    case ADD_CELL:
      return postCell(notebookId, formData.get("cell") as string);
    case DELETE_CELL:
      return deleteCell(notebookId, formData.get("cellId") as string);
    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
};
