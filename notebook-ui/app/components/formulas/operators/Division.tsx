import type { FormulaProps } from "~/components/formulas/Formula";
import Formula from "~/components/formulas/Formula";

export default function Division({ inputs }: FormulaProps) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "max-content",
      }}
    >
      <span>
        <Formula {...inputs[0]} />
      </span>
      <span
        style={{ border: "solid 1px black", color: "black", width: "100%" }}
      />
      <span>
        <Formula {...inputs[1]} />
      </span>
    </span>
  );
}
