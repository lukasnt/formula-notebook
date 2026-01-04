import type { FormulaData } from "~/api/types/notebook-data";

export interface Operator {
  operator: string;
  type: "nullary" | "unary" | "binary";
  symbol: string;
  keybind?: string;
  composite?: FormulaData;
}

export const ARITHMETIC_OPERATORS: Operator[] = [
  { operator: "PLUS", type: "binary", symbol: "+", keybind: "+" },
  { operator: "MINUS", type: "binary", symbol: "-", keybind: "-" },
  { operator: "MULTIPLICATION", type: "binary", symbol: "×", keybind: "*" },
  { operator: "DIVISION", type: "binary", symbol: "÷", keybind: "/" },
  { operator: "SQUARED", type: "unary", symbol: "x²", keybind: "**" },
  { operator: "CUBED", type: "unary", symbol: "x³", keybind: "***" },
  { operator: "POWER", type: "binary", symbol: "xª", keybind: "^" },
  { operator: "SQRT", type: "unary", symbol: "✓x", keybind: "shift+r" },
  { operator: "CUBE_ROOT", type: "unary", symbol: "∛x", keybind: "shift+c" },
  { operator: "INVERSE", type: "unary", symbol: "1/x", keybind: "shift+i" },
  { operator: "PERCENTAGE", type: "unary", symbol: "%", keybind: "shift+5" },
  { operator: "ROUND", type: "unary", symbol: "round", keybind: "o" },
  { operator: "FLOOR", type: "unary", symbol: "⌊x⌋", keybind: "f" },
  { operator: "CEILING", type: "binary", symbol: "⌈x⌉", keybind: "c" },
  { operator: "MODULO", type: "binary", symbol: "mod", keybind: "%" },
  { operator: "ABSOLUTE", type: "unary", symbol: "|x|", keybind: "shift+a" },
  { operator: "NEGATE", type: "unary", symbol: "±x", keybind: "n" },
];

export const CONSTANT_OPERATORS: Operator[] = [
  { operator: "PI", type: "nullary", symbol: "π", keybind: "p" },
  { operator: "E", type: "nullary", symbol: "e", keybind: "e" },
  { operator: "GR", type: "nullary", symbol: "φ", keybind: "g" },
  { operator: "TAU", symbol: "τ", type: "nullary", keybind: "t" },
  { operator: "INFINITY", type: "nullary", symbol: "∞", keybind: "shift+8" }
];

export const FUNCTIONS_OPERATORS: Operator[] = [
  { operator: "LN", type: "unary", symbol: "ln", keybind: "l" },
  { operator: "LOG", type: "unary", symbol: "log", keybind: "shift+l" },
  { operator: "LOG_B", type: "binary", symbol: "logb", keybind: "shift+b" },
  { operator: "EXP", type: "unary", symbol: "exp", keybind: "shift+e" },
  { operator: "SQRT_B", type: "binary", symbol: "ª✓x", keybind: "shift+v" },
  { operator: "RAD", type: "unary", symbol: "rad", keybind: "r" },
  { operator: "DEG", type: "unary", symbol: "deg", keybind: "d" },
  { operator: "SIN", type: "unary", symbol: "sin", keybind: "s" },
  { operator: "COS", type: "unary", symbol: "cos", keybind: "shift+s" },
  { operator: "TAN", type: "unary", symbol: "tan", keybind: "shift+n" },
  { operator: "ASIN", type: "unary", symbol: "asin", keybind: "a" },
  { operator: "ACOS", type: "unary", symbol: "acos", keybind: "shift+a" },
  { operator: "ATAN", type: "unary", symbol: "atan", keybind: "shift+t" },
  { operator: "SINH", type: "unary", symbol: "sinh", keybind: "h" },
  { operator: "COSH", type: "unary", symbol: "cosh", keybind: "shift+h" },
  { operator: "TANH", type: "unary", symbol: "tanh", keybind: "shift+y" },
  { operator: "SIGNUM", type: "unary", symbol: "sgn", keybind: "shift+g" },
  { operator: "RAND", type: "unary", symbol: "rand", keybind: "shift+r" },
  { operator: "FACT", type: "unary", symbol: "x!", keybind: "!" },
  { operator: "GCD", type: "binary", symbol: "gcd", keybind: "shift+g" },
  { operator: "LCM", type: "binary", symbol: "lcm", keybind: "shift+l" },
  { operator: "COMB", type: "binary", symbol: "nCr", keybind: "shift+c" },
  { operator: "PERM", type: "binary", symbol: "nPr", keybind: "shift+p" },
];

const ALL_OPERATORS: Operator[] = [
  ...ARITHMETIC_OPERATORS,
  ...CONSTANT_OPERATORS,
  ...FUNCTIONS_OPERATORS,
];

const TYPE_MAP: { [key: string]: "nullary" | "unary" | "binary" } =
  ALL_OPERATORS.reduce(
    (map, op) => {
      map[op.operator] = op.type;
      return map;
    },
    {} as { [key: string]: "nullary" | "unary" | "binary" },
  );

export const getTypeOfOperator = (
  operator: string,
): "nullary" | "unary" | "binary" | null => {
  return TYPE_MAP[operator] || null;
};

export const insertOperator = (
  old: FormulaData,
  newData: FormulaData,
): FormulaData => {
  switch (getTypeOfOperator(newData.operator)) {
    case "nullary":
      return nullaryInsertion(old, newData);
    case "unary":
      return unaryInsertion(old, newData);
    case "binary":
      return binaryInsertion(old, newData);
    default:
      return newData;
  }
};

export const nullaryInsertion = (
  old: FormulaData,
  newData: FormulaData,
): FormulaData => {
  return {
    ...newData,
    inputs: [],
  };
};

export const unaryInsertion = (
  old: FormulaData,
  newData: FormulaData,
): FormulaData => {
  return {
    ...newData,
    inputs: [{ ...old }],
  };
};

export const binaryInsertion = (
  old: FormulaData,
  newData: FormulaData,
): FormulaData => {
  return {
    ...newData,
    inputs: [{ ...old }, ...newData.inputs],
  };
};
