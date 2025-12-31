import Formula, { type FormulaProps } from "~/components/formulas/Formula";

export default function Minus(props: FormulaProps) {
  return (
    <span
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Formula {...props.inputs[0]} />
      <span>-</span>
      {props.inputs[1].inputs.length >= 2 ? (
        <>
          <span>(</span>
          <Formula {...props.inputs[1]} />
          <span>)</span>
        </>
      ) : (
        <Formula {...props.inputs[1]} />
      )}
    </span>
  );
}
