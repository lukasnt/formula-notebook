import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";
import { containsMultipleFormulas } from "~/state/formula-utils";
import Brackets from "~/components/operators/Brackets";

export default function Multiplication({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      {containsMultipleFormulas(inputs[0]) ? (
        <Brackets>
          <Formula {...inputs[0]} />
        </Brackets>
      ) : (
        <Formula {...inputs[0]} />
      )}
      <span>×</span>
      {containsMultipleFormulas(inputs[1]) ? (
        <Brackets>
          <Formula {...inputs[1]} />
        </Brackets>
      ) : (
        <Formula {...inputs[1 ]} />
      )}
    </span>
  );
}
