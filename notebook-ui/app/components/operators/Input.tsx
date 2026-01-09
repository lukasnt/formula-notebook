import FormulaField from "~/components/formulas/FormulaField";
import "./operator.css";
import type { FormulaProps } from "~/components/formulas/Formula";

export default function Input({ value }: FormulaProps) {
  return (
    <span className="row-operator">
      <FormulaField initValue={value?.num} />
    </span>
  );
}
