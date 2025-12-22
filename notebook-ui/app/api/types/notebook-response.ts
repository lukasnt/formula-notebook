import type { CellProps } from "~/components/notebook/Cell";

export interface NotebookResponse {
  notebookId: string;
  title: string;
  created: string;
  modified: string;
  cells: CellProps[];
}