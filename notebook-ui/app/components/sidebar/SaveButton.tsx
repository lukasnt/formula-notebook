import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import "./sidebar.css";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
import type { RootState } from "~/providers/store";
import { useFetcher } from "react-router";
import {
  type NotebookAction,
  SAVE_NOTEBOOK,
} from "~/routes/actions/notebook-actions";

export default function SaveButton() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const fetcher = useFetcher<NotebookAction>();

  const handleSaveNotebook = () => {
    fetcher.submit(
      { notebook: JSON.stringify(notebook), actionType: SAVE_NOTEBOOK },
      { method: "POST" },
    );
  };

  return (
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
  );
}
