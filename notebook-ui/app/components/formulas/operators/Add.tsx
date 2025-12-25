import Formula, { type FormulaProps } from "~/components/formulas/Formula";

export default function Add(props: FormulaProps) {
  return (
    <span
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Formula {...props.inputs[0]} />
      <span>+</span>
      <Formula {...props.inputs[1]} />
    </span>
  );
}
