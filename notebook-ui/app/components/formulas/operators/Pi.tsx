import { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function Pi({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>π</span>
    </span>
  );
}
