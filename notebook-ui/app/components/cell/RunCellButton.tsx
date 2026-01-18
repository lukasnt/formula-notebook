import type { CellData } from "~/api/types/notebook-data";
import { PlayArrow } from "@mui/icons-material";
import { Button, Snackbar } from "@mui/material";
import { useFetcher } from "react-router";
import {
  type NotebookAction,
  RUN_CELL,
} from "~/routes/actions/notebook-actions";
import useGlobalKeyPress from "~/hooks/global-key-press";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useEffect, useState } from "react";

export default function RunCellButton(data: CellData) {
  const fetcher = useFetcher<NotebookAction>();
  const selectedCell = useSelector(
    (state: RootState) => state.notebook.selectedCell,
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRunCell = () => {
    fetcher.submit(
      {
        cellId: data.cellId,
        cell: JSON.stringify(data),
        actionType: RUN_CELL,
      },
      { method: "PUT" },
    );
  };

  useEffect(() => {
    const cellData: CellData = fetcher?.data?.cellData as CellData;
    if (fetcher?.data?.actionType === RUN_CELL) {
      if (cellData.evaluated?.error) {
        setSnackbarOpen(true);
      }
    }
  }, [fetcher?.data?.cellData]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useGlobalKeyPress(
    ["Shift", "Enter"],
    () => {
      if (data.cellId === selectedCell) {
        handleRunCell();
      }
    },
    { requireAll: true },
  );

  return (
    <>
      <Button
        size={"small"}
        variant={"text"}
        color={"inherit"}
        onClick={handleRunCell}
      >
        <PlayArrow fontSize={"small"} />
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        message="Could not evaluate cell"
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
