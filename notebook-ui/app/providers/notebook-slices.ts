import type { NotebookProps } from "~/components/notebook/Notebook";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CellProps } from "~/components/notebook/Cell";

const initialState: NotebookProps = {
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
    initNotebook: (state, action: PayloadAction<NotebookProps>) => {
      return action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addCell: (state, action: PayloadAction<CellProps>) => {
      state.cells.push(action.payload);
    },
    initCell: (state, action: PayloadAction<CellProps>) => {
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
  },
});

export const { initNotebook, setTitle, addCell, initCell, deleteCell } =
  notebookSlice.actions;
export default notebookSlice.reducer;
