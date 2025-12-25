import React, { useEffect, useState } from "react";
import "./formula.css";
import FormulaOperator from "~/components/formulas/operators/FormulaOperator";

export interface Selected {
  id: string;
  depth: number;
}

export interface FormulaProps {
  id: string;
  operator: string;
  inputs: FormulaProps[];
  value?: number;
  depth?: number;
  selected?: Selected;
  setSelected?: (newSelected: Selected) => void;
}

export default function Formula(props: FormulaProps) {
  const depth = props.depth || 0;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(props.id == props?.selected?.id);
  }, [props.selected]);

  return (
    <div
      className={isSelected ? "formula selected" : "formula"}
      onMouseOverCapture={(e) => {
        if (
          props.selected &&
          props.setSelected &&
          depth >= props.selected.depth
        ) {
          props.setSelected({ id: props.id, depth: depth });
        }
      }}
      onMouseOutCapture={(e) => {
        if (props.setSelected) {
          props.setSelected({ id: "", depth: 0 });
        }
      }}
    >
      <FormulaOperator
        {...props}
        depth={depth + 1}
        inputs={props.inputs.map((input: FormulaProps) => {
          return {
            ...input,
            selected: props.selected,
            setSelected: props.setSelected,
            depth: depth + 2,
          };
        })}
      />
    </div>
  );
}

export function FormulaRoot(props: FormulaProps) {
  const depth = props.depth || 0;
  const initSelected: Selected = { id: "", depth: 0 };
  const [selected, setSelected] = useState(initSelected);

  return (
    <div>
      <Formula
        {...props}
        id={"null"}
        depth={depth + 1}
        selected={selected}
        setSelected={(newSelected: Selected) => setSelected(newSelected)}
      />
    </div>
  );
}
