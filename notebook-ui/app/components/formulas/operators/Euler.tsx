import { type FormulaProps } from "~/components/formulas/Formula";
import "./operator.css";

export default function Euler({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span>e</span>
    </span>
  );
}
