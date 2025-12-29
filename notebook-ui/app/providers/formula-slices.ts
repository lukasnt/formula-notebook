import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FormulaProps } from "~/components/formulas/Formula";

export const emptyFormula = {
  id: "",
  operator: "",
  inputs: [],
};

export const testInputs: FormulaProps[] = [
  {
    id: "1",
    operator: "PLUS",
    inputs: [
      {
        id: "2",
        operator: "DIVISION",
        inputs: [
          {
            id: "3",
            operator: "DIVISION",
            inputs: [
              {
                id: "4",
                operator: "PLUS",
                value: { num: 10 },
                inputs: [
                  {
                    id: "5",
                    operator: "CONSTANT",
                    value: { num: 5 },
                    inputs: [],
                  },
                  {
                    id: "6",
                    operator: "CONSTANT",
                    value: { num: 6 },
                    inputs: [],
                  },
                ],
              },
              {
                id: "7",
                operator: "CONSTANT",
                value: { num: 20 },
                inputs: [],
              },
            ],
          },
          {
            id: "8",
            operator: "CONSTANT",
            value: { num: 20 },
            inputs: [],
          },
        ],
      },
      { id: "9", operator: "CONSTANT", value: { num: 20 }, inputs: [] },
    ],
  },
  {
    id: "10",
    operator: "CONSTANT",
    value: { num: 20 },
    inputs: [],
  },
];

export interface SelectedFormulaState {
  rootFormula: FormulaProps;
  selectedFormula: FormulaProps;
}

const initialCellFormula: FormulaProps = {
  cellId: "",
  id: "0",
  operator: "PLUS",
  inputs: testInputs,
};

const initialSelectedFormula: FormulaProps = emptyFormula;

const initialState: SelectedFormulaState = {
  rootFormula: initialCellFormula,
  selectedFormula: initialSelectedFormula,
}

export const selectedFormulaSlice = createSlice({
  name: "selectedFormula",
  initialState: initialState,
  reducers: {
    setSelectedFormula: (state, action: PayloadAction<FormulaProps>) => {
      state.selectedFormula = action.payload;
    },
    setRootFormula: (state, action: PayloadAction<FormulaProps>) => {
      state.rootFormula = action.payload;
    },
    insertFormulaEnd: (state, action: PayloadAction<FormulaProps>) => {
      state.rootFormula = { ...action.payload, inputs: [state.rootFormula, ...action.payload.inputs] };
    },
    insertAtSelected: (state, action: PayloadAction<FormulaProps>) => {
      let newRoot = {...state.rootFormula}
      let stack = [newRoot];
      let current = newRoot;

      // Check if root is the selected, and if so, replace with new formula directly
      if (newRoot.id === state.selectedFormula.id) {
        newRoot = {
          ...action.payload,
          inputs: [{ ...newRoot }, ...action.payload.inputs],
        };
        state.selectedFormula = newRoot;
      }

      // Traverse tree until finding selected and insert new formula
      while (stack.length > 0 && current.id != state.selectedFormula.id) {
        current = stack.pop() as FormulaProps;
        let newInputs: FormulaProps[] = [];
        for (const input of current.inputs) {
          // Check if any of the inputs are the selected
          if (input.id === state.selectedFormula.id) {
            const inserted = {
              ...action.payload,
              inputs: [{ ...input }, ...action.payload.inputs],
            };
            newInputs.push(inserted);
            state.selectedFormula = inserted;
          } else {
            newInputs.push(input);
          }
          // Push the input onto the stack to continue traversing
          stack.push(input);
        }
        // Make a copy of the inputs to ensure state change is triggered
        current.inputs = [...newInputs];
      }
      state.rootFormula = newRoot;
    }
  },
});


export const { setSelectedFormula, setRootFormula, insertFormulaEnd, insertAtSelected } =
  selectedFormulaSlice.actions;
export default selectedFormulaSlice.reducer;
