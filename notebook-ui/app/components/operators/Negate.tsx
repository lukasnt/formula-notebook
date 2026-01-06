import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";
import { containsMultipleFormulas } from "~/state/formula-utils";
import Brackets from "~/components/operators/Brackets";

export default function Negate({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>-</span>
      {containsMultipleFormulas(inputs[0]) ? (
        <Brackets>
          <Formula {...inputs[0]} />
        </Brackets>
      ) : (
        <Formula {...inputs[0]} />
      )}
    </span>
  );
}
