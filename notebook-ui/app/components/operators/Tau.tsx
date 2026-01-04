import { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function Tau({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>τ</span>
    </span>
  );
}
