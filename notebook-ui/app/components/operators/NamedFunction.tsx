import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import Brackets from "~/components/operators/Brackets";
import "./operator.css";
import { getSymbolOfOperator } from "~/components/operators/operators";

export default function NamedFunction({ operator, inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>{getSymbolOfOperator(operator)}</span>
      <Brackets>
        <Formula {...inputs[0]} />
      </Brackets>
    </span>
  );
}
