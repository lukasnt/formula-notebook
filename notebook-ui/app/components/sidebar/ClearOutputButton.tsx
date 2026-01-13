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
  CLEAR_OUTPUT,
  type NotebookAction,
} from "~/routes/actions/notebook-actions";
import { onlyData } from "~/state/notebook-utils";
import { useEffect, useState } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function ClearOutputButton() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const fetcher = useFetcher<NotebookAction>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClearOutputs = () => {
    fetcher.submit(
      {
        notebook: JSON.stringify(onlyData(notebook)),
        actionType: CLEAR_OUTPUT,
      },
      { method: "POST" },
    );
  };

  useEffect(() => {
    if (fetcher.data?.actionType === CLEAR_OUTPUT) {
      setSnackbarOpen(true);
    }
  }, [fetcher.data]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={handleClearOutputs}>
        <ListItemText>
          <Typography variant={"subtitle2"} component="div">
            Clear output
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ClearAllIcon htmlColor={"black"} />
        </ListItemIcon>
      </ListItemButton>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        message="Output cleared successfully"
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
