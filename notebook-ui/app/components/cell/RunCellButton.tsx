import type { CellData } from "~/api/types/notebook-data";
import { PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useFetcher } from "react-router";
import {
  type NotebookAction,
  RUN_CELL,
} from "~/routes/actions/notebook-actions";
import useGlobalKeyPress from "~/hooks/global-key-press";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";

export default function RunCellButton(data: CellData) {
  const fetcher = useFetcher<NotebookAction>();
  const selectedCell = useSelector(
    (state: RootState) => state.notebook.selectedCell,
  );

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

  useGlobalKeyPress(["Shift", "Enter"], () => {
      if (data.cellId === selectedCell) {
        handleRunCell();
      }
    },
    { requireAll: true },
  );

  return (
    <Button
      size={"small"}
      variant={"text"}
      color={"inherit"}
      onClick={handleRunCell}
    >
      <PlayArrow fontSize={"small"} />
    </Button>
  );
}
