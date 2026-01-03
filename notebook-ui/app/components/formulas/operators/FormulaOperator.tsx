import Constant from "~/components/formulas/operators/Constant";
import Plus from "~/components/formulas/operators/Plus";
import Division from "~/components/formulas/operators/Division";
import React from "react";
import type { FormulaProps } from "~/components/formulas/Formula";
import Minus from "~/components/formulas/operators/Minus";
import Input from "~/components/formulas/operators/Input";
import Multiplication from "~/components/formulas/operators/Multiplication";
import Power from "~/components/formulas/operators/Power";

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
    default:
      return <Input />;
  }
}
