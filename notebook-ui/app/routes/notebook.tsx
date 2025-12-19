import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";

import "./styles/notebook.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CalculateIcon from "@mui/icons-material/Calculate";

export default function Notebook() {
  return (
    <div className="notebook-page-container">
      <div className="sidebar-space">
        <Paper variant={"elevation"} className={"sidebar-container"}>
          <List
            subheader={
              <ListSubheader component="div">
                Available operations
              </ListSubheader>
            }
          >
            <ListItemButton onClick={() => {}}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Arithmetic" />
              {true ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={true}>
              <List sx={{ pl: 4 }}>
                <ListItemButton>
                  <ListItemText primary={"+"} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary={"-"} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary={"*"} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary={"/"} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Paper>
      </div>
      <Paper className={"notebook-container"}>Lore ipsum dolor sit amet</Paper>
    </div>
  );
}
