import type { NotebookData } from "~/components/notebook/Notebook";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CellData } from "~/components/notebook/Cell";

const initialState: NotebookData = {
  notebookId: "",
  title: "",
  created: new Date().toDateString(),
  modified: new Date().toDateString(),
  cells: [],
  cellCount: 0,
};

export const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    initNotebook: (state, action: PayloadAction<NotebookData>) => {
      return action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addCell: (state, action: PayloadAction<CellData>) => {
      state.cells.push(action.payload);
    },
    initCell: (state, action: PayloadAction<CellData>) => {
      const cell = state.cells.find((cell) => cell.cellId === "");
      if (cell) {
        cell.cellId = action.payload.cellId;
        cell.updated = action.payload.updated;
      } else {
        state.cells.push(action.payload);
      }
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      state.cells = state.cells.filter(
        (cell) => cell.cellId !== action.payload,
      );
    },
    editCellText: (state, action: PayloadAction<CellData>) => {
      const cell = state.cells.find(
        (cell) => cell.cellId === action.payload.cellId,
      );
      if (cell) {
        cell.textContent = action.payload.textContent;
      }
    },
  },
});

export const { initNotebook, setTitle, addCell, initCell, deleteCell, editCellText } =
  notebookSlice.actions;
export default notebookSlice.reducer;
