export interface NotebookData {
  notebookId: string;
  title: string;
  created: string;
  modified: string;
  cells: CellData[];
  cellCount: number;
}

export interface CellData {
  notebookId: string;
  cellId: string;
  updated?: string;
  symbol?: string;
  formula?: FormulaData;
  textContent?: string;
  evaluated?: { num?: number; error?: string };
}

export interface FormulaData {
  cellId?: string;
  id: string;
  operator: string;
  inputs: FormulaData[];
  value?: { num?: number; error?: string };
}
