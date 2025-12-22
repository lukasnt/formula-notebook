import { Button, Paper, TextField, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import Cell, { type CellProps } from "~/components/notebook/Cell";
import { v4 } from "uuid";

export interface NotebookProps {
  notebookId: string;
  title: string;
  created: Date;
  modified: Date;
  cells: CellProps[];
  cellCount: number;
}

export default function Notebook(props: NotebookProps) {
  const [title, setTitle] = useState(props.title);
  const [cells, setCells] = useState<CellProps[]>(props.cells);

  const handleAddCell = () => {
    setCells([
      ...cells,
      {
        notebookId: props.notebookId,
        cellId: v4(),
        symbol: "",
        textContent: "",
        updated: new Date(),
      },
    ]);
  };

  return (
    <div className="notebook-container">
      <Paper className={"title-container"}>
        <TextField
          variant="standard"
          color={"primary"}
          fullWidth={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          slotProps={{
            input: { style: { fontSize: 24 } },
          }}
        />
      </Paper>
      <Paper className={"cells-container"}>
        {cells.map((cellData) => (
          <Cell {...cellData} />
        ))}
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
      </Paper>
    </div>
  );
}
