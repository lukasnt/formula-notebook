import { Button, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { type CellData } from "~/components/notebook/Cell";
import { useDispatch } from "react-redux";
import { initCell } from "~/providers/notebook-slices";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import {
  ADD_CELL,
  type NotebookAction,
} from "~/routes/actions/notebook-actions";
import { v4 } from "uuid";

export interface AddCellButtonProps {
  notebookId: string;
  onAddCell: (newCell: CellData) => void;
}

export default function AddCellButton({
  notebookId,
  onAddCell,
}: AddCellButtonProps) {
  const dispatch = useDispatch();
  const fetcher = useFetcher<NotebookAction>();

  const handleAddCell = async () => {
    let newCell: CellData = {
      notebookId: notebookId,
      cellId: v4(),
      symbol: "",
      textContent: "",
      updated: "",
    };
    onAddCell(newCell);
  };

  useEffect(() => {
    if (fetcher.data?.actionType === ADD_CELL) {
      dispatch(initCell(fetcher.data.cellData as CellData));
    }
  }, [fetcher.data]);

  return (
    <div className={"add-button-container"}>
      <Button
        color="inherit"
        fullWidth
        variant="outlined"
        onClick={handleAddCell}
      >
        <Typography>Add cell</Typography>
        <AddCircleOutlineIcon />
      </Button>
    </div>
  );
}
