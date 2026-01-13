import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";

import "./sidebar.css";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { useFetcher } from "react-router";
import {
  type NotebookAction,
  SAVE_NOTEBOOK,
} from "~/routes/actions/notebook-actions";
import { onlyData } from "~/state/notebook-utils";
import { useEffect, useState } from "react";

export default function SaveButton() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const fetcher = useFetcher<NotebookAction>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSaveNotebook = () => {
    fetcher.submit(
      {
        notebook: JSON.stringify(onlyData(notebook)),
        actionType: SAVE_NOTEBOOK,
      },
      { method: "POST" },
    );
  };

  useEffect(() => {
    if (fetcher.data?.actionType === SAVE_NOTEBOOK) {
      setSnackbarOpen(true);
    }
  }, [fetcher.data]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={handleSaveNotebook}>
        <ListItemText>
          <Typography variant={"subtitle2"} component="div">
            Save
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <SaveIcon htmlColor={"black"} />
        </ListItemIcon>
      </ListItemButton>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        message="Notebook saved successfully"
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
