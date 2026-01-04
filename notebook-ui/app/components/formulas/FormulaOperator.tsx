import Constant from "~/components/operators/Constant";
import Plus from "~/components/operators/Plus";
import Division from "~/components/operators/Division";
import React from "react";
import type { FormulaProps } from "~/components/formulas/Formula";
import Minus from "~/components/operators/Minus";
import Input from "~/components/operators/Input";
import Multiplication from "~/components/operators/Multiplication";
import Power from "~/components/operators/Power";
import Ln from "~/components/operators/Ln";
import Pi from "~/components/operators/Pi";
import Euler from "~/components/operators/Euler";
import GoldenRatio from "~/components/operators/GoldenRatio";
import Tau from "~/components/operators/Tau";
import Sqrt from "~/components/operators/Sqrt";
import CubeRoot from "~/components/operators/CubeRoot";

export default function FormulaOperator(props: FormulaProps) {
  switch (props.operator) {
    case "CONSTANT":
      return <Constant {...props} />;
    case "PLUS":
      return <Plus {...props} />;
    case "MINUS":
      return <Minus {...props} />;
    case "MULTIPLICATION":
      return <Multiplication {...props} />;
    case "DIVISION":
      return <Division {...props} />;
    case "POWER":
      return <Power {...props} />;
    case "SQRT":
      return <Sqrt {...props} />;
    case "CUBE_ROOT":
      return <CubeRoot {...props} />;
    case "LN":
      return <Ln {...props} />;
    case "PI":
      return <Pi {...props} />;
    case "E":
      return <Euler {...props} />;
    case "GR":
      return <GoldenRatio {...props} />;
    case "TAU":
      return <Tau {...props} />;
    default:
      return <Input />;
  }
}
