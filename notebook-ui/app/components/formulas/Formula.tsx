import React, { useEffect, useState } from "react";
import "./formula.css";
import FormulaOperator from "~/components/formulas/operators/FormulaOperator";
import { useDispatch } from "react-redux";
import { setSelectedFormula } from "~/providers/formula-slices";

export interface Selected {
  id: string;
  depth: number;
}

export interface FormulaProps {
  id: string;
  operator: string;
  inputs: FormulaProps[];
  value?: { num?: number; error?: string };
  depth?: number;
  hovered?: Selected;
  setHovered?: (newHovered: Selected) => void;
  selected?: Selected;
  setSelected?: (newSelected: Selected) => void;
}

export default function Formula(props: FormulaProps) {
  const depth = props.depth || 0;
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsHovered(props.id == props?.hovered?.id);
  }, [props.hovered]);

  useEffect(() => {
    setIsSelected(props.id == props?.selected?.id);
  }, [props.selected]);

  const styleName = (isHovered: boolean, isSelected: boolean): string => {
    return isSelected
      ? "formula selected"
      : isHovered
        ? "formula hovered"
        : "formula";
  };

  return (
    <div
      className={styleName(isHovered, isSelected)}
      onMouseOverCapture={(e) => {
        if (props.hovered && props.setHovered && depth >= props.hovered.depth) {
          props.setHovered({ id: props.id, depth: depth });
        }
      }}
      onMouseOutCapture={(e) => {
        if (props.setHovered) {
          props.setHovered({ id: "", depth: 0 });
        }
      }}
      onClick={(e) => {
        if (
          props.hovered &&
          props.setSelected &&
          depth >= props.hovered.depth
        ) {
          props.setSelected({ id: props.id, depth: depth });
          dispatch(setSelectedFormula(props));
        }
      }}
    >
      <FormulaOperator
        {...props}
        depth={depth + 1}
        inputs={props.inputs.map((input: FormulaProps) => {
          return {
            ...input,
            depth: depth + 2,
            hovered: props.hovered,
            setHovered: props.setHovered,
            selected: props.selected,
            setSelected: props.setSelected,
          };
        })}
      />
    </div>
  );
}

export function FormulaRoot(props: FormulaProps) {
  const depth = props.depth || 0;
  const initHovered: Selected = { id: "", depth: 0 };
  const [hovered, setHovered] = useState(initHovered);
  const [selected, setSelected] = useState(props.selected || initHovered);

  return (
    <div>
      <Formula
        {...props}
        id={props.id}
        depth={depth + 1}
        hovered={hovered}
        setHovered={(newHovered: Selected) => setHovered(newHovered)}
        selected={props.selected}
        setSelected={(newSelected: Selected) => setSelected(newSelected)}
      />
    </div>
  );
}
