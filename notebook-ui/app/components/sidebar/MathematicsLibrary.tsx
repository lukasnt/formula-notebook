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
import AbcIcon from "@mui/icons-material/Abc";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import OperatorButton, {
  type OperatorButtonProps,
} from "~/components/sidebar/OperatorButton";
import FunctionsIcon from "@mui/icons-material/Functions";
import { useState } from "react";
import {
  ARITHMETIC_OPERATORS,
  CONSTANT_OPERATORS,
  FUNCTIONS_OPERATORS,
} from "~/components/operators/operators";

export default function MathematicsLibrary() {
  const [openArithmetic, setOpenArithmetic] = useState(true);
  const [openConstants, setOpenConstants] = useState(true);
  const [openFunctions, setOpenFunctions] = useState(false);

  const handleClickOpenArithmetic = () => {
    setOpenArithmetic(!openArithmetic);
  };

  const handleClickOpenConstants = () => {
    setOpenConstants(!openConstants);
  };

  const handleClickOpenFunctions = () => {
    setOpenFunctions(!openFunctions);
  };

  const createOperatorListItems = (operators: OperatorButtonProps[]) => {
    return Array.from(
      { length: Math.ceil(operators.length / 3) },
      (_, rowIndex) => (
        <ListItem dense>
          {operators.slice(rowIndex * 3, rowIndex * 3 + 3).map((op, i) => (
            <OperatorButton
              key={rowIndex * 3 + i}
              keybind={op.keybind || ""}
              symbol={op.symbol}
              operator={op.operator}
            />
          ))}
        </ListItem>
      ),
    );
  }

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
          {createOperatorListItems(ARITHMETIC_OPERATORS)}
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickOpenConstants}>
        <ListItemIcon>
          <AbcIcon />
        </ListItemIcon>
        <ListItemText primary="Constants" />
        {openConstants ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openConstants}>
        <List sx={{ pl: 1 }}>
          {createOperatorListItems(CONSTANT_OPERATORS)}
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
          {createOperatorListItems(FUNCTIONS_OPERATORS)}
        </List>
      </Collapse>
    </List>
  );
}
