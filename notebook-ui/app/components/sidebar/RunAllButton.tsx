import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";

import "./sidebar.css";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useFetcher } from "react-router";
import {
  type NotebookAction,
  RUN_ALL_CELLS,
} from "~/routes/actions/notebook-actions";
import { onlyData } from "~/state/notebook-utils";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useEffect, useState } from "react";

export default function RunAllButton() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const fetcher = useFetcher<NotebookAction>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRunCells = () => {
    fetcher.submit(
      {
        notebook: JSON.stringify(onlyData(notebook)),
        actionType: RUN_ALL_CELLS,
      },
      { method: "POST" },
    );
  };

  useEffect(() => {
    if (fetcher.data?.actionType === RUN_ALL_CELLS) {
      setSnackbarOpen(true);
    }
  }, [fetcher.data])

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={handleRunCells}>
        <ListItemText>
          <Typography variant={"subtitle2"} component="div">
            Run cells
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <FastForwardIcon htmlColor={"black"} />
        </ListItemIcon>
      </ListItemButton>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        message="Cells executed successfully"
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
