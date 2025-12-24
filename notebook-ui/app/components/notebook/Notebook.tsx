import { Paper } from "@mui/material";

import "./notebook.css";
import Cell, { type CellData } from "~/components/notebook/Cell";
import { useDispatch } from "react-redux";
import { addCell, deleteCell } from "~/providers/notebook-slices";
import { useFetcher, useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import {
  ADD_CELL,
  DELETE_CELL,
  type NotebookAction,
} from "~/routes/actions/notebook-actions";
import NotebookTitle from "~/components/notebook/NotebookTitle";
import type { loader } from "~/routes/notebook";
import AddCellButton from "~/components/notebook/AddCellButton";

export interface NotebookData {
  notebookId: string;
  title: string;
  created: string;
  modified: string;
  cells: CellData[];
  cellCount: number;
}

export default function Notebook() {
  const { notebook } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();
  const fetcher = useFetcher<NotebookAction>();
  const [cellIds, setCellIds] = useState<string[]>([]);

  useEffect(() => {
    setCellIds(notebook.cells.map((cell: CellData) => cell.cellId));
  }, []);

  return (
    <div className="notebook-container">
      <NotebookTitle notebookId={notebook.notebookId} />
      <Paper className={"cells-container"}>
        {cellIds.map((cellId: string) => (
          <Cell
            key={cellId}
            cellId={cellId}
            notebookId={notebook.notebookId}
            onDelete={(cellId: string) => {
              setCellIds(cellIds.filter((id: string) => id !== cellId));
              dispatch(deleteCell(cellId));
              fetcher.submit(
                { cellId: cellId, actionType: DELETE_CELL },
                { method: "DELETE" },
              );
            }}
          />
        ))}
        <AddCellButton
          notebookId={notebook.notebookId}
          onAddCell={(cell: CellData) => {
            setCellIds([...cellIds, cell.cellId]);
            dispatch(addCell(cell));
            fetcher.submit(
              { cell: JSON.stringify(cell), actionType: ADD_CELL },
              { method: "POST" },
            );
          }}
        />
      </Paper>
    </div>
  );
}
