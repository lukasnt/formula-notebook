import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function Plus({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <Formula {...inputs[0]} />
      <span>+</span>
      <Formula {...inputs[1]} />
    </span>
  );
}
