import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import Brackets from "~/components/operators/Brackets";
import "./operator.css";

export default function Ln({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>ln</span>
      <Brackets>
        <Formula {...inputs[0]} />
      </Brackets>
    </span>
  );
}
