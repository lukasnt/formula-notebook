import { Button, Paper, TextField, Typography } from "@mui/material";

import "./notebook.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cell, { type CellProps } from "~/components/notebook/Cell";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/providers/store";
import { addCell, initCell, setTitle } from "~/providers/notebook-slices";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import { ADD_CELL } from "~/routes/actions/notebook-actions";

export interface NotebookProps {
  notebookId: string;
  title: string;
  created: string;
  modified: string;
  cells: CellProps[];
  cellCount: number;
}

export default function Notebook() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const dispatch = useDispatch();
  const cellFetcher = useFetcher<CellProps>();

  const handleAddCell = async () => {
    let newCell: CellProps = {
      notebookId: notebook.notebookId,
      cellId: "",
      symbol: "",
      textContent: "",
      updated: "",
    };
    dispatch(addCell(newCell));
    await cellFetcher.submit({
      cell: JSON.stringify(newCell),
      action: ADD_CELL,
    });
  };

  useEffect(() => {
    console.log(cellFetcher.data);
    dispatch(initCell(cellFetcher.data as CellProps));
  }, [cellFetcher.data]);

  return (
    <div className="notebook-container">
      <Paper className={"title-container"}>
        <TextField
          variant="standard"
          color={"primary"}
          fullWidth={true}
          value={notebook.title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          slotProps={{
            input: { style: { fontSize: 24 } },
          }}
        />
      </Paper>
      <Paper className={"cells-container"}>
        {notebook.cells.map((cellData) => (
          <Cell key={cellData.cellId} {...cellData} />
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
