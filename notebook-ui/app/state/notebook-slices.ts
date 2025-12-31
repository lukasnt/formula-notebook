import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { NULL_UUID } from "~/components/notebook/AddCellButton";
import { nullFormula } from "~/state/formula-const";
import { insertFormulaAt, replaceFormulaAt } from "~/state/formula-utils";
import { findCell } from "~/state/cell-utils";
import type { WritableDraft } from "immer";
import type {
  CellData,
  FormulaData,
  NotebookData,
} from "~/api/types/notebook-data";

export interface NotebookState extends NotebookData {
  selectedCell: string;
  selectedFormula: FormulaData;
}

const initialState: NotebookState = {
  notebookId: "",
  title: "",
  created: new Date().toDateString(),
  modified: new Date().toDateString(),
  cells: [],
  cellCount: 0,
  selectedCell: "",
  selectedFormula: nullFormula,
};

export const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    initNotebook: (state, action: PayloadAction<NotebookData>) => {
      return {
        ...action.payload,
        selectedCell: "",
        selectedFormula: state.selectedFormula,
      };
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addCell: (state, action: PayloadAction<CellData>) => {
      state.cells.push(action.payload);
    },
    initCell: (state, action: PayloadAction<CellData>) => {
      const cell = findCell(state, NULL_UUID);
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
      const cell = findCell(state, action.payload.cellId);
      if (cell) {
        cell.textContent = action.payload.textContent;
      }
    },
    setSelectedFormula: (state, action: PayloadAction<FormulaData>) => {
      state.selectedFormula = action.payload;
    },
    setSelectedCell: (state, action: PayloadAction<string>) => {
      state.selectedCell = action.payload;
    },
    insertAtSelected: (state, action: PayloadAction<FormulaData>) => {
      let cell = findCell(
        state,
        state.selectedCell as string,
      ) as WritableDraft<CellData>;
      insertFormulaAt(state, cell, action.payload);
    },
    replaceAtSelected: (state, action: PayloadAction<FormulaData>) => {
      let cell = findCell(
        state,
        state.selectedCell as string,
      ) as WritableDraft<CellData>;
      replaceFormulaAt(state, cell, action.payload);
    },
  },
});

export const {
  initNotebook,
  setTitle,
  addCell,
  initCell,
  deleteCell,
  editCellText,
  setSelectedFormula,
  setSelectedCell,
  insertAtSelected,
  replaceAtSelected,
} = notebookSlice.actions;
export default notebookSlice.reducer;
