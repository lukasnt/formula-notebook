import type { CellData } from "~/components/notebook/Cell";

export interface NotebookResponse {
  notebookId: string;
  title: string;
  created: string;
  modified: string;
  cells: CellData[];
}
