import { Button, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { type CellData } from "~/components/notebook/Cell";

export interface AddCellButtonProps {
  notebookId: string;
  onAddCell: (newCell: CellData) => void;
}

export const NULL_UUID: string = "00000000-0000-0000-0000-000000000000";

export default function AddCellButton({
  notebookId,
  onAddCell,
}: AddCellButtonProps) {
  
  const handleAddCell = async () => {
    let newCell: CellData = {
      notebookId: notebookId,
      cellId: NULL_UUID,
      symbol: "",
      textContent: "",
      updated: "",
    };
    onAddCell(newCell);
  };

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
