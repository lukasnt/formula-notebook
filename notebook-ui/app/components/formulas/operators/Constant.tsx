import { type FormulaProps } from "~/components/formulas/Formula";

export default function Constant({ value }: FormulaProps) {
  return <span>{value?.num}</span>;
}
