import FormulaField from "~/components/formulas/FormulaField";

export default function Empty() {
  return (
    <span
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <FormulaField />
    </span>
  );
}
