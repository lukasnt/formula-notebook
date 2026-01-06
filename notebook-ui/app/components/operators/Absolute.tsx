import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function Absolute({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>|</span>
      <Formula {...inputs[0]} />
      <span>|</span>
    </span>
  );
}
