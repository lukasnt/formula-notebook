import "./notebook.css";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, PlayArrow } from "@mui/icons-material";
import { type ChangeEvent, useState } from "react";

export default function Cell() {
  const [result, setResult] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleRunCell = () => {
    setResult(textValue);
  };

  return (
    <Paper className={"cell"} style={{ background: "white" }}>
      <div className={"cell-header-container"}>
        <div className={"cell-header-left"}>
          <span className={"cell-header-left-element"}>
            <Button
              size={"small"}
              variant={"text"}
              color={"inherit"}
              onClick={handleRunCell}
            >
              <PlayArrow fontSize={"small"} />
            </Button>
          </span>
          <span className={"cell-header-left-element"}>
            <Select
              className="cell-type-select"
              style={{
                fontSize: "small",
              }}
              size="small"
              variant={"standard"}
              value={"text"}
              label={"Cell type"}
              defaultValue={"text"}
              disableUnderline
            >
              <MenuItem value={"text"} style={{ fontSize: "small" }}>
                Text
              </MenuItem>
              <MenuItem value={"formula"} style={{ fontSize: "small" }}>
                Formula
              </MenuItem>
            </Select>
          </span>
        </div>
        <div className={"cell-header-right"}>
          <span className={"cell-header-right-element"}>
            <Button size={"small"} variant={"text"} color={"inherit"}>
              <Delete fontSize={"small"} />
            </Button>
          </span>
        </div>
      </div>
      <div className={"cell-body"}>
        <TextField
          multiline
          variant="standard"
          fullWidth
          value={textValue}
          onChange={handleTextChange}
          slotProps={{
            input: { disableUnderline: true },
          }}
        />
      </div>
      {result != null && (
        <div className={"cell-result-container"}>
          <Typography>{result}</Typography>
        </div>
      )}
    </Paper>
  );
}
