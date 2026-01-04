import Formula, { type FormulaProps } from "~/components/formulas/Formula";
import Brackets from "~/components/formulas/operators/Brackets";
import "./operator.css";
import { containsMultipleFormulas } from "~/state/formula-utils";

export default function CubeRoot({ inputs }: FormulaProps) {
  return (
    <span className="row-operator">
      <span
        style={{
          position: "relative",
          width: "0.6em",
          height: "2.5em",
          marginLeft: "0.2em",
        }}
      >
        <SqrtSvg />
      </span>
      {containsMultipleFormulas(inputs[0]) ? (
        <Brackets>
          <Formula {...inputs[0]} />
        </Brackets>
      ) : (
        <Formula {...inputs[0]} />
      )}
    </span>
  );
}

const SqrtSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style={{
      position: "absolute",
      width: "auto",
      height: "100%",
      left: "-1em",
      color: "inherit",
    }}
    viewBox="0 0 96 96"
  >
    <text
      x="40"
      y="50"
      fontSize="20"
      fontFamily="Latin Modern Math"
      fill="currentColor"
    >
      3
    </text>
    <g transform="translate(25.8, 62.4)">
      <path
        d="M40.03-38.4L40.03-38.4Q40.42-38.4 40.66-38.14 40.9-37.87 40.94-37.54L40.94-37.54 40.94-37.25 29.76-14.06 18.48 9.26Q18.29 9.6 17.57 9.6L17.57 9.6Q17.14 9.6 16.99 9.46L16.99 9.46 7.68-10.8 4.56-8.54Q4.32-8.54 3.89-8.95 3.46-9.36 3.46-9.65L3.46-9.65Q3.46-9.84 5.02-11.09 6.58-12.34 8.23-13.56 9.89-14.78 9.94-14.83L9.94-14.83Q10.03-14.93 10.18-14.93L10.18-14.93Q10.51-14.93 10.75-14.45L10.75-14.45 19.06 3.7Q19.1 3.7 24.05-6.53 28.99-16.75 33.96-27.12 38.93-37.49 39.07-37.73L39.07-37.73Q39.41-38.4 40.03-38.4Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);
