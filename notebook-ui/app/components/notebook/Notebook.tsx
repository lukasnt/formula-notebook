import { Button, Paper, TextField, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import Cell from "~/components/notebook/Cell";

export default function Notebook() {
  const [title, setTitle] = useState("Untitled");
  const [cells, setCells] = useState<string[]>([]);

  const handleAddCell = () => {
    setCells([...cells, "123"]);
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
        {cells.map((content) => (
          <Cell />
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
