import type { FormulaData } from "~/api/types/notebook-data";
import { v4 } from "uuid";
import { attachIds } from "~/state/formula-utils";

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
  { operator: "MULT", type: "binary", symbol: "×", keybind: "*" },
  { operator: "DIV", type: "binary", symbol: "÷", keybind: "/" },
  {
    operator: "SQ",
    type: "binary",
    symbol: "x²",
    keybind: "**",
    composite: {
      id: "",
      operator: "POW",
      inputs: [
        { id: "", operator: "INPUT", inputs: [] },
        { id: "", operator: "CONST", inputs: [], value: { num: 2 } },
      ],
    },
  },
  {
    operator: "CUBED",
    type: "unary",
    symbol: "x³",
    keybind: "***",
    composite: {
      id: "",
      operator: "POW",
      inputs: [
        { id: "", operator: "INPUT", inputs: [] },
        { id: "", operator: "CONST", inputs: [], value: { num: 3 } },
      ],
    },
  },
  { operator: "POW", type: "binary", symbol: "xª", keybind: "^" },
  { operator: "SQRT", type: "unary", symbol: "✓x", keybind: "r" },
  { operator: "CUBE_RT", type: "unary", symbol: "∛x", keybind: "shift+c" },
  {
    operator: "INV",
    type: "unary",
    symbol: "1/x",
    keybind: "shift+i",
    composite: {
      id: "",
      operator: "DIV",
      inputs: [
        {
          id: "",
          operator: "CONST",
          inputs: [],
          value: { num: 1 },
        },
        { id: "", operator: "INPUT", inputs: [] },
      ],
    },
  },
  { operator: "PERCENTAGE", type: "unary", symbol: "%", keybind: "shift+5" },
  { operator: "ROUND", type: "unary", symbol: "round", keybind: "o" },
  { operator: "FLOOR", type: "unary", symbol: "⌊x⌋", keybind: "f" },
  { operator: "CEIL", type: "unary", symbol: "⌈x⌉", keybind: "c" },
  { operator: "MOD", type: "binary", symbol: "mod", keybind: "%" },
  { operator: "ABS", type: "unary", symbol: "|x|", keybind: "shift+a" },
  { operator: "NEG", type: "unary", symbol: "±x", keybind: "n" },
];

export const CONSTANT_OPERATORS: Operator[] = [
  { operator: "PI", type: "nullary", symbol: "π", keybind: "p" },
  { operator: "E", type: "nullary", symbol: "e", keybind: "e" },
  { operator: "GR", type: "nullary", symbol: "φ", keybind: "g" },
  { operator: "TAU", symbol: "τ", type: "nullary", keybind: "t" },
  { operator: "INFINITY", type: "nullary", symbol: "∞", keybind: "shift+8" },
];

export const FUNCTIONS_OPERATORS: Operator[] = [
  { operator: "LN", type: "unary", symbol: "ln", keybind: "l" },
  { operator: "LOG", type: "unary", symbol: "log", keybind: "shift+l" },
  { operator: "LOG_B", type: "binary", symbol: "logb", keybind: "shift+b" },
  {
    operator: "EXP",
    type: "unary",
    symbol: "exp",
    keybind: "shift+e",
    composite: {
      id: "",
      operator: "POW",
      inputs: [
        { id: "", operator: "E", inputs: [] },
        { id: "", operator: "INPUT", inputs: [] },
      ],
    },
  },
  { operator: "SQRT_B", type: "binary", symbol: "ª✓x", keybind: "shift+v" },
  { operator: "RAD", type: "unary", symbol: "rad", keybind: "shift+r" },
  { operator: "DEG", type: "unary", symbol: "deg", keybind: "d" },
  { operator: "SIN", type: "unary", symbol: "sin", keybind: "s" },
  { operator: "COS", type: "unary", symbol: "cos", keybind: "shift+s" },
  { operator: "TAN", type: "unary", symbol: "tan", keybind: "shift+n" },
  { operator: "ASIN", type: "unary", symbol: "asin", keybind: "a" },
  { operator: "ACOS", type: "unary", symbol: "acos", keybind: "shift+a" },
  { operator: "ATAN", type: "unary", symbol: "atan", keybind: "shift+t" },
  { operator: "SINH", type: "unary", symbol: "sinh", keybind: "h" },
  { operator: "COSH", type: "unary", symbol: "cosh", keybind: "shift+h" },
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

const OPERATOR_MAP: { [key: string]: Operator } = ALL_OPERATORS.reduce(
  (map, op) => {
    map[op.operator] = op;
    return map;
  },
  {} as { [key: string]: Operator },
);

export const getSymbolOfOperator = (operator: string): string | null => {
  return OPERATOR_MAP[operator]?.symbol || null;
}

export const getTypeOfOperator = (
  operator: string,
): "nullary" | "unary" | "binary" | null => {
  return TYPE_MAP[operator] || null;
};

export const createInputFormula = (
  existing: FormulaData,
  operator: string,
): FormulaData => {
  if (OPERATOR_MAP[operator]?.composite) {
    return {
      ...attachIds(replaceInputs(OPERATOR_MAP[operator]?.composite, existing)),
    };
  }
  return insertOperator(existing, {
    id: v4(),
    operator: operator,
    inputs: [{ id: v4(), operator: "INPUT", inputs: [] }],
  });
};

const replaceInputs = (
  old: FormulaData,
  newFormula: FormulaData,
): FormulaData => {
  return {
    ...old,
    inputs: old.inputs.map((inp) =>
      inp.operator === "INPUT" ? { ...newFormula } : inp,
    ),
  };
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
