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
import { type ChangeEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { editCellText } from "~/providers/notebook-slices";
import { useDispatch } from "react-redux";

export interface CellData {
  notebookId: string;
  cellId: string;
  updated?: string;
  symbol?: string;
  formula?: any;
  textContent?: string;
  evaluated?: { num: number; error: string };
}

export interface CellProps {
  notebookId: string;
  cellId: string;
  onDelete: (cellId: string) => void;
}

export default function Cell({ notebookId, cellId, onDelete }: CellProps) {
  const { notebook } = useLoaderData();
  const [result, setResult] = useState<number | undefined>();
  const [textValue, setTextValue] = useState<string | undefined>();
  const dispatch = useDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    dispatch(editCellText({ cellId, notebookId, textContent: e.target.value }));
  };

  const handleRunCell = () => {};

  const handleDeleteCell = () => {
    onDelete(cellId);
  };

  useEffect(() => {
    const cellData: CellData = notebook.cells.find(
      (cell: CellData) => cell.cellId === cellId,
    );
    if (cellData) {
      setResult(cellData.evaluated?.num);
      setTextValue(cellData.textContent);
    }
  }, [notebook.cells]);

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
            <Button
              size={"small"}
              variant={"text"}
              color={"inherit"}
              onClick={handleDeleteCell}
            >
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
