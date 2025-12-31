import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import OperatorButton from "~/components/sidebar/OperatorButton";
import FunctionsIcon from "@mui/icons-material/Functions";
import { useState } from "react";

export default function MathematicsLibrary() {
  const [openArithmetic, setOpenArithmetic] = useState(true);
  const [openFunctions, setOpenFunctions] = useState(false);

  const handleClickOpenArithmetic = () => {
    setOpenArithmetic(!openArithmetic);
  };

  const handleClickOpenFunctions = () => {
    setOpenFunctions(!openFunctions);
  };

  return (
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
        <List sx={{ pl: 1 }}>
          <ListItem>
            <OperatorButton symbol="+" operator="PLUS" />
            <OperatorButton symbol="-" operator="MINUS" />
            <OperatorButton symbol="/" operator="DIVISION" />
          </ListItem>
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
        <List sx={{ pl: 1 }}>
          <ListItem style={{ textAlign: "center" }}>
            <ListItemText primary={"sqrt()"} />
            <ListItemText primary={"exp()"} />
            <ListItemText primary={"ln()"} />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
