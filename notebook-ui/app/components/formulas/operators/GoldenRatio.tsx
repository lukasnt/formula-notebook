import { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function GoldenRatio({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>φ</span>
    </span>
  );
}
