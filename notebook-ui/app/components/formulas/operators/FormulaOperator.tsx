import Constant from "~/components/formulas/operators/Constant";
import Plus from "~/components/formulas/operators/Plus";
import Division from "~/components/formulas/operators/Division";
import React from "react";
import type { FormulaProps } from "~/components/formulas/Formula";

export default function FormulaOperator(props: FormulaProps) {
  switch (props.operator) {
    case "CONSTANT":
      return <Constant {...props} />;
    case "PLUS":
      return <Plus {...props} />;
    case "DIVISION":
      return <Division {...props} />;
    default:
      return <>?</>;
  }
}
