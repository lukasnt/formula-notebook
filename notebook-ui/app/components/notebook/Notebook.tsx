import { useNavigate } from "react-router";
import { Button, Paper, TextField, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

export default function Notebook() {
  const [title, setTitle] = useState("Title");
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
          <Paper className={"cell"} style={{ background: "white" }}>
            <Typography>Lore ipsum dolor sit amet</Typography>
          </Paper>
        ))}
        <div className={"add-button-container"}>
          <Button
            color={"inherit"}
            fullWidth
            variant="contained"
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
