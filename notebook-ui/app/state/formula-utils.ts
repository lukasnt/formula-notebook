import type { WritableDraft } from "immer";
import type { FormulaProps } from "~/components/formulas/Formula";
import type { NotebookState } from "~/state/notebook-slices";

export const insertFormula = (
  state: WritableDraft<NotebookState>,
  newFormula: FormulaProps,
) => {
  let newRoot = { ...state.rootFormula };
  let stack = [newRoot];
  let current = newRoot;

  // Check if root is the selected, and if so, replace with new formula directly
  if (newRoot.id === state.selectedFormula.id) {
    newRoot = {
      ...newFormula,
      inputs: [{ ...newRoot }, ...newFormula.inputs],
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
          ...newFormula,
          inputs: [{ ...input }, ...newFormula.inputs],
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
};

