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

export const ARITHMETIC_OPERATORS: OperatorButtonProps[] = [
  { operator: "PLUS", symbol: "+", keybind: "+" },
  { operator: "MINUS", symbol: "-", keybind: "-" },
  { operator: "MULTIPLICATION", symbol: "×", keybind: "*" },
  { operator: "DIVISION", symbol: "÷", keybind: "/" },
  { operator: "SQUARED", symbol: "x²", keybind: "**" },
  { operator: "CUBED", symbol: "x³", keybind: "***" },
  { operator: "POWER", symbol: "xª", keybind: "^" },
  { operator: "SQRT", symbol: "✓x", keybind: "shift+r" },
  { operator: "CUBE_ROOT", symbol: "∛x", keybind: "shift+c" },
  { operator: "INVERSE", symbol: "1/x", keybind: "shift+i" },
  { operator: "PERCENTAGE", symbol: "%", keybind: "shift+5" },
  { operator: "ROUND", symbol: "round", keybind: "o" },
  { operator: "FLOOR", symbol: "⌊x⌋", keybind: "f" },
  { operator: "CEILING", symbol: "⌈x⌉", keybind: "c" },
  { operator: "MODULO", symbol: "mod", keybind: "%" },
  { operator: "ABSOLUTE", symbol: "|x|", keybind: "shift+a" },
  { operator: "NEGATE", symbol: "±x", keybind: "n" },
];

const CONSTANT_OPERATORS: OperatorButtonProps[] = [
  { operator: "PI", symbol: "π", keybind: "p" },
  { operator: "EULER_NUMBER", symbol: "e", keybind: "e" },
  { operator: "GOLDEN_RATIO", symbol: "φ", keybind: "g" },
  { operator: "TAU", symbol: "τ", keybind: "t" },
  { operator: "INFINITY", symbol: "∞", keybind: "shift+8" },
];

const FUNCTIONS_OPERATORS: OperatorButtonProps[] = [
  { operator: "NATURAL_LOGARITHM", symbol: "ln", keybind: "l" },
  { operator: "COMMON_LOGARITHM", symbol: "log", keybind: "shift+l" },
  { operator: "LOGARITHM_BASE", symbol: "logb", keybind: "shift+b" },
  { operator: "EXPONENTIAL", symbol: "exp", keybind: "shift+e" },
  { operator: "ROOT_BASE", symbol: "ª✓x", keybind: "shift+v" },
  { operator: "RADIANS", symbol: "rad", keybind: "r" },
  { operator: "DEGREES", symbol: "deg", keybind: "d" },
  { operator: "SINE", symbol: "sin", keybind: "s" },
  { operator: "COSINE", symbol: "cos", keybind: "shift+s" },
  { operator: "TANGENT", symbol: "tan", keybind: "shift+n" },
  { operator: "ARCSINE", symbol: "asin", keybind: "a" },
  { operator: "ARCCOSINE", symbol: "acos", keybind: "shift+a" },
  { operator: "ARCTANGENT", symbol: "atan", keybind: "shift+t" },
  { operator: "HYPERBOLIC_SINE", symbol: "sinh", keybind: "h" },
  { operator: "HYPERBOLIC_COSINE", symbol: "cosh", keybind: "shift+h" },
  { operator: "HYPERBOLIC_TANGENT", symbol: "tanh", keybind: "shift+y" },
  { operator: "SIGNUM", symbol: "sgn", keybind: "shift+g" },
  { operator: "RANDOM", symbol: "rand", keybind: "shift+r" },
  { operator: "FACTORIAL", symbol: "x!", keybind: "!" },
  { operator: "GCD", symbol: "gcd", keybind: "shift+g" },
  { operator: "LCM", symbol: "lcm", keybind: "shift+l" },
  { operator: "COMBINATION", symbol: "nCr", keybind: "shift+c" },
  { operator: "PERMUTATION", symbol: "nPr", keybind: "shift+p" },
];

export default function MathematicsLibrary() {
  const [openArithmetic, setOpenArithmetic] = useState(true);
  const [openConstants, setOpenConstants] = useState(true);
  const [openFunctions, setOpenFunctions] = useState(false);

  const handleClickOpenArithmetic = () => {
    setOpenArithmetic(!openArithmetic);
  };

  const handleClickOpenConstants = () => {
    setOpenConstants(!openArithmetic);
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
        {openConstants ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openConstants}>
        <List sx={{ pl: 1 }}>
          {createOperatorListItems(FUNCTIONS_OPERATORS)}
        </List>
      </Collapse>
    </List>
  );
}
