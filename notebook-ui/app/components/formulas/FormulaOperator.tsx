import Constant from "~/components/operators/Constant";
import Plus from "~/components/operators/Plus";
import Division from "~/components/operators/Division";
import React from "react";
import type { FormulaProps } from "~/components/formulas/Formula";
import Minus from "~/components/operators/Minus";
import Input from "~/components/operators/Input";
import Multiplication from "~/components/operators/Multiplication";
import Power from "~/components/operators/Power";
import Pi from "~/components/operators/Pi";
import Euler from "~/components/operators/Euler";
import GoldenRatio from "~/components/operators/GoldenRatio";
import Tau from "~/components/operators/Tau";
import Sqrt from "~/components/operators/Sqrt";
import CubeRoot from "~/components/operators/CubeRoot";
import NamedFunction from "~/components/operators/NamedFunction";
import Percentage from "~/components/operators/Percentage";
import Floor from "~/components/operators/Floor";
import Ceil from "~/components/operators/Ceil";
import Absolute from "~/components/operators/Absolute";
import Negate from "~/components/operators/Negate";
import Modulo from "../operators/Modulo";

export default function FormulaOperator(props: FormulaProps) {
  switch (props.operator) {
    case "CONST":
      return <Constant {...props} />;
    case "PLUS":
      return <Plus {...props} />;
    case "MINUS":
      return <Minus {...props} />;
    case "MULT":
      return <Multiplication {...props} />;
    case "DIV":
      return <Division {...props} />;
    case "POW":
      return <Power {...props} />;
    case "SQRT":
      return <Sqrt {...props} />;
    case "CUBE_RT":
      return <CubeRoot {...props} />;
    case "PERCENTAGE":
      return <Percentage {...props} />;
    case "FLOOR":
      return <Floor {...props} />;
    case "CEIL":
      return <Ceil {...props} />;
    case "ABS":
      return <Absolute {...props} />;
    case "NEG":
      return <Negate {...props} />;
    case "MOD":
      return <Modulo {...props} />;
    case "ROUND":
    case "LN":
    case "RAD":
    case "DEG":
    case "SIN":
    case "COS":
    case "TAN":
    case "ASIN":
    case "ACOS":
    case "ATAN":
    case "LOG":
    case "COSH":
    case "SINH":
    case "SIGNUM":
    case "RAND":
      return <NamedFunction {...props} />;
    case "PI":
      return <Pi {...props} />;
    case "E":
      return <Euler {...props} />;
    case "GR":
      return <GoldenRatio {...props} />;
    case "TAU":
      return <Tau {...props} />;
    default:
      return <Input {...props} />;
  }
}
