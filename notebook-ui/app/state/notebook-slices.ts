import type { NotebookData } from "~/components/notebook/Notebook";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CellData } from "~/components/notebook/Cell";
import { NULL_UUID } from "~/components/notebook/AddCellButton";
import type { FormulaProps } from "~/components/formulas/Formula";
import { emptyFormula, initialCellFormula } from "~/state/formula-const";
import { insertFormula } from "~/state/formula-utils";

export interface NotebookState extends NotebookData {
  rootFormula: FormulaProps;
  selectedFormula: FormulaProps;
}

const initialState: NotebookState = {
  notebookId: "",
  title: "",
  created: new Date().toDateString(),
  modified: new Date().toDateString(),
  cells: [],
  cellCount: 0,
  rootFormula: initialCellFormula,
  selectedFormula: emptyFormula,
};

export const notebookSlice = createSlice({
  name: "notebook",
  initialState,
  reducers: {
    initNotebook: (state, action: PayloadAction<NotebookData>) => {
      return {
        ...action.payload,
        rootFormula: state.rootFormula,
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
      const cell = state.cells.find((cell) => cell.cellId === NULL_UUID);
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
    setSelectedFormula: (state, action: PayloadAction<FormulaProps>) => {
      state.selectedFormula = action.payload;
    },
    setRootFormula: (state, action: PayloadAction<FormulaProps>) => {
      state.rootFormula = action.payload;
    },
    insertFormulaEnd: (state, action: PayloadAction<FormulaProps>) => {
      state.rootFormula = {
        ...action.payload,
        inputs: [state.rootFormula, ...action.payload.inputs],
      };
    },
    insertAtSelected: (state, action: PayloadAction<FormulaProps>) => {
      insertFormula(state, action.payload);
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
  setRootFormula,
  insertFormulaEnd,
  insertAtSelected,
} = notebookSlice.actions;
export default notebookSlice.reducer;
