import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";

import "./sidebar.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CalculateIcon from "@mui/icons-material/Calculate";
import FunctionsIcon from "@mui/icons-material/Functions";
import FastForwardIcon from "@mui/icons-material/FastForward";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useState } from "react";

export default function Sidebar() {
  const [openArithmetic, setOpenArithmetic] = useState(false);
  const [openFunctions, setOpenFunctions] = useState(false);

  const handleClickOpenArithmetic = () => {
    setOpenArithmetic(!openArithmetic);
  }

  const handleClickOpenFunctions = () => {
    setOpenFunctions(!openFunctions);
  }

  return (
    <Paper variant={"elevation"} className={"sidebar-container"}>
      <List
        subheader={
          <ListSubheader component="div">Notebook controls</ListSubheader>
        }
      >
        <List sx={{ pl: 4 }}>
          <ListItemButton>
            <ListItemText>
              <Typography variant={"subtitle2"} component="div">
                Save
              </Typography>
            </ListItemText>
            <ListItemIcon>
              <SaveIcon htmlColor={"black"} />
            </ListItemIcon>
          </ListItemButton>
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
      <List
        subheader={
          <ListSubheader component="div">Mathematical library</ListSubheader>
        }
      >
        <ListItemButton onClick={handleClickOpenArithmetic}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="Arithmetic" />
          {openArithmetic ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openArithmetic}>
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
        <ListItemButton onClick={handleClickOpenFunctions}>
          <ListItemIcon>
            <FunctionsIcon />
          </ListItemIcon>
          <ListItemText primary="Functions" />
          {openFunctions ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFunctions}>
          <List sx={{ pl: 4 }}>
            <ListItemButton>
              <ListItemText primary={"exp()"} />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary={"ln()"} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <div style={{ height: 100 }}></div>
    </Paper>
  );
}
