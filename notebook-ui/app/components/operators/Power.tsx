import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import { containsMultipleFormulas } from "~/state/formula-utils";
import Brackets from "~/components/operators/Brackets";
import "./operator.css";

export default function Power({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      {containsMultipleFormulas(inputs[0]) ? (
        <>
          <Brackets>
            <Formula {...inputs[0]} />
          </Brackets>
        </>
      ) : (
        <Formula {...inputs[0]} />
      )}
      <span
        style={{
          position: "relative",
          top: "-0.5em",
          fontSize: "0.6em",
          marginLeft: "0.1em",
        }}
      >
        <Formula {...inputs[1]} />
      </span>
    </span>
  );
}
