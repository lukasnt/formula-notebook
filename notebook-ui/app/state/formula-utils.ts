import type { WritableDraft } from "immer";
import type { NotebookState } from "~/state/notebook-slices";
import type { CellData, FormulaData } from "~/api/types/notebook-data";
import type { FormulaProps } from "~/components/formulas/Formula";
import { createEmptyFormula } from "~/state/formula-const";

export const onlyData = (props: FormulaProps): FormulaData => {
  return {
    cellId: props.cellId,
    id: props.id,
    operator: props.operator,
    inputs: props.inputs.map((input) => onlyData(input)),
    value: { ...props.value },
  };
};

export const containsMultipleFormulas = (
  formula: FormulaData | null,
): boolean => {
  if (!formula) return false;
  if (formula.inputs.length > 1) return true;
  for (const input of formula.inputs) {
    if (containsMultipleFormulas(input)) {
      return true;
    }
  }
  return false;
};

export const insertFormulaAt = (
  state: WritableDraft<NotebookState>,
  cell: WritableDraft<CellData>,
  newFormula: FormulaData,
) => {
  return modifyFormulaAt(
    state,
    cell,
    newFormula,
    (old: FormulaData, newData: FormulaData): FormulaData => {
      return {
        ...newData,
        inputs: [{ ...old }, ...newData.inputs],
      };
    },
  );
};

export const replaceFormulaAt = (
  state: WritableDraft<NotebookState>,
  cell: WritableDraft<CellData>,
  newFormula: FormulaData,
) => {
  return modifyFormulaAt(
    state,
    cell,
    newFormula,
    (old: FormulaData, newData: FormulaData): FormulaData => {
      return { ...newData, inputs: [...newData.inputs] };
    },
  );
};

export const modifyFormulaAt = (
  state: WritableDraft<NotebookState>,
  cell: WritableDraft<CellData>,
  newFormula: FormulaData,
  modify: (old: FormulaData, newData: FormulaData) => FormulaData,
) => {
  let newRoot = { ...(cell.formula as FormulaData) };
  let stack = [newRoot];
  let current = newRoot;

  // Check if formula is null, and if so, replace with new formula directly
  if (!cell.formula) {
    cell.formula = { ...newFormula };
    return;
  }

  // Check if root is the selected, and if so, replace with new formula directly
  if (newRoot.id === state.selectedFormula.id) {
    newRoot = modify(newRoot, newFormula);
    state.selectedFormula = newFormula.inputs[0] || newRoot;
  }

  // Traverse tree until finding selected and insert new formula
  while (stack.length > 0 && current.id != state.selectedFormula.id) {
    current = stack.pop() as FormulaData;
    let newInputs: FormulaData[] = [];
    for (const input of current.inputs) {
      // Check if any of the inputs are the selected
      if (input.id === state.selectedFormula.id) {
        const inserted = modify(input, newFormula);
        newInputs.push(inserted);
        state.selectedFormula = newFormula.inputs[0] || inserted;
      } else {
        newInputs.push(input);
      }
      // Push the input onto the stack to continue traversing
      stack.push(input);
    }
    // Make a copy of the inputs to ensure state change is triggered
    current.inputs = [...newInputs];
  }
  cell.formula = newRoot;
};

export const removeFormulaAt = (
  state: WritableDraft<NotebookState>,
  cell: WritableDraft<CellData>,
) => {
  let newRoot = { ...(cell.formula as FormulaData) };
  let stack = [newRoot];
  let parent = newRoot;
  const removeId = state.selectedFormula.id;
  let selectedParent: FormulaData | null = null;

  // Check if root is the selected, and if so, replace with empty formula
  if (newRoot.id === removeId) {
    newRoot = createEmptyFormula();
  }

  // Check if selected is directly in the root inputs
  let newInputs: FormulaData[] = [];
  for (const input of parent.inputs) {
    if (input.id === removeId) {
      selectedParent = parent;
    }
    newInputs.push(input);
  }
  if (selectedParent) {
    // Remove the selected formula by promoting its inputs to the parent
    newInputs = [...newInputs].filter(
      (input) => input.id !== removeId && input.id !== selectedParent?.id,
    );
    state.selectedFormula = newInputs[newInputs.length - 1];
    cell.formula = newInputs[newInputs.length - 1];
    return;
  }

  // Traverse tree until finding selected and remove it
  while (stack.length > 0) {
    parent = stack.pop() as FormulaData;
    let newInputs: FormulaData[] = [];
    // Check if any child of the inputs of parent is the selected
    for (const input of parent.inputs) {
      let childInputs: FormulaData[] = [];
      for (const child of input.inputs) {
        if (child.id === removeId) {
          selectedParent = input;
        }
        childInputs.push(child);
      }
      // If the selected's parent is this input, promote its children
      if (selectedParent === input) {
        newInputs = newInputs.concat(childInputs);
      }
      stack.push(input);
      newInputs.push(input);
    }
    if (selectedParent) {
      // Remove the selected formula by promoting its inputs to the parent
      newInputs = [...newInputs].filter(
        (input) => input.id !== removeId && input.id !== selectedParent?.id,
      );
      state.selectedFormula = newInputs[newInputs.length - 1];
      parent.inputs = [...newInputs];
      break;
    }
    // Make a copy of the inputs to ensure state change is triggered
    parent.inputs = [...newInputs];
  }
  cell.formula = newRoot;
};
