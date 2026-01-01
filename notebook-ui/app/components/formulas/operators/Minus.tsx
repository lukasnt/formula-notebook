import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import { containsMultipleFormulas } from "~/state/formula-utils";
import Brackets from "~/components/formulas/operators/Brackets";
import "./operator.css"

export default function Minus({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <Formula {...inputs[0]} />
      <span>-</span>
      {containsMultipleFormulas(inputs[1]) ? (
        <>
          <Brackets>
            <Formula {...inputs[1]} />
          </Brackets>
        </>
      ) : (
        <Formula {...inputs[1]} />
      )}
    </span>
  );
}
