import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";

import "./sidebar.css";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SaveButton from "~/components/sidebar/SaveButton";
import { useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import FormulaOptions from "~/components/sidebar/FormulaOptions";
import MathematicsLibrary from "~/components/sidebar/MathematicsLibrary";

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
          <ListItemButton>
            <ListItemText>
              <Typography variant={"subtitle2"} component="div">
                Run cells
              </Typography>
            </ListItemText>
            <ListItemIcon>
              <FastForwardIcon htmlColor={"black"} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>
              <Typography variant={"subtitle2"} component="div">
                Clear output
              </Typography>
            </ListItemText>
            <ListItemIcon>
              <ClearAllIcon htmlColor={"black"} />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </List>
      {selectedFormula.id != "" && (
        <>
          <FormulaOptions />
          <MathematicsLibrary />
        </>
      )}
      <div style={{ height: 100 }}></div>
    </Paper>
  );
}
