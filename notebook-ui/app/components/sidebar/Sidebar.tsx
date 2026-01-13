import { List, ListSubheader, Paper } from "@mui/material";

import "./sidebar.css";
import SaveButton from "~/components/sidebar/SaveButton";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import FormulaOptions from "~/components/sidebar/FormulaOptions";
import MathematicsLibrary from "~/components/sidebar/MathematicsLibrary";
import RunAllButton from "~/components/sidebar/RunAllButton";
import ClearOutputButton from "~/components/sidebar/ClearOutputButton";

export default function Sidebar() {
  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  return (
    <Paper variant={"elevation"} className={"sidebar-container"}>
      <List
        subheader={
          <ListSubheader component="div">Notebook controls</ListSubheader>
        }
      >
        <List sx={{ pl: 4 }}>
          <SaveButton />
          <RunAllButton />
          <ClearOutputButton />
        </List>
      </List>
      {selectedFormula?.id != "" && (
        <>
          <FormulaOptions />
          <MathematicsLibrary />
        </>
      )}
      <div style={{ height: 100 }}></div>
    </Paper>
  );
}
