import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormulaProps } from "~/components/formulas/Formula";

export const emptyFormula = {
  id: "",
  operator: "",
  inputs: [],
};

const initialState: FormulaProps = emptyFormula;

export const formulaSlice = createSlice({
  name: "formula",
  initialState,
  reducers: {
    setSelectedFormula: (state, action: PayloadAction<FormulaProps>) => {
      return action.payload;
    },
  },
});

export const { setSelectedFormula } = formulaSlice.actions;
export default formulaSlice.reducer;
