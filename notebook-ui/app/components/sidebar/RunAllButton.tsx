import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export default function RunAllButton() {
  const notebook = useSelector((state: RootState) => state.notebook);
  const fetcher = useFetcher<NotebookAction>();

  const handleRunCells = () => {
    fetcher.submit(
      {
        notebook: JSON.stringify(onlyData(notebook)),
        actionType: RUN_ALL_CELLS,
      },
      { method: "POST" },
    );
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
    </>
  );
}
