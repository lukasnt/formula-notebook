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
import { useFetcher } from "react-router";
import { DELETE_CELL } from "~/routes/actions/notebook-actions";
import { deleteCell } from "~/providers/notebook-slices";
import { useDispatch } from "react-redux";

export interface CellProps {
  notebookId: string;
  cellId: string;
  updated: string;
  symbol?: string;
  formula?: any;
  textContent?: string;
  evaluated?: { num: number; error: string };
}

export default function Cell(props: CellProps) {
  const [result, setResult] = useState<number | undefined>(
    props.evaluated?.num,
  );
  const [textValue, setTextValue] = useState<string | undefined>(
    props.textContent,
  );
  const dispatch = useDispatch();
  const cellFetcher = useFetcher<CellProps>();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleRunCell = () => {};

  const handleDeleteCell = () => {
    dispatch(deleteCell(props.cellId));
    cellFetcher.submit({ cellId: props.cellId, actionType: DELETE_CELL });
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
