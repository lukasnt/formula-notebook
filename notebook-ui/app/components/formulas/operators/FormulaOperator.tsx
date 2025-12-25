import Constant from "~/components/formulas/operators/Constant";
import Add from "~/components/formulas/operators/Add";
import Division from "~/components/formulas/operators/Division";
import React from "react";
import type { FormulaProps } from "~/components/formulas/Formula";

export default function FormulaOperator(props: FormulaProps) {
  switch (props.operator) {
    case "CONSTANT":
      return <Constant {...props} />;
    case "ADD":
      return <Add {...props} />;
    case "DIVISION":
      return <Division {...props} />;
    default:
      return <></>;
  }
}
