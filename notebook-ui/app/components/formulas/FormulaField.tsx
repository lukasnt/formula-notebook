import { TextField } from "@mui/material";
import { useState } from "react";
import "./formula.css";
import { useDispatch } from "react-redux";
import { removeSelected, replaceAtSelected } from "~/state/notebook-slices";
import { v4 } from "uuid";

interface FormulaFieldProps {
  initValue?: number;
}

export default function FormulaField({ initValue }: FormulaFieldProps) {
  const [activeInput, setActiveInput] = useState(true);
  const [value, setValue] = useState(initValue ? initValue.toString() : "");

  const dispatch = useDispatch();

  const submitInput = () => {
    dispatch(
      replaceAtSelected({
        id: v4(),
        operator: "CONST",
        value: { num: parseInt(value) },
        inputs: [],
      }),
    );
    setActiveInput(false);
  };

  return (
    <span>
      <TextField
        name="name"
        variant="outlined"
        size="small"
        hiddenLabel
        style={{ minWidth: 35, width: 55, margin: 0, padding: 0 }}
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            pattern: "[0-9]",
            fielding: "content",
            style: {
              paddingBottom: 0,
              paddingTop: 0,
              textAlign: "center",
              fontSize: 25,
              fontFamily: "Latin Modern Math",
            },
          },
        }}
        focused={activeInput}
        autoFocus={true}
        disabled={!activeInput}
        value={value}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) setValue(e.target.value);
        }}
        onBlur={(e) => {
          if (value !== "") {
            submitInput();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitInput();
          }
          if (e.key === "Backspace" && value !== "") {
            e.stopPropagation();
          }
          if (e.key === "Escape") {
            dispatch(removeSelected());
          }
        }}
      />
    </span>
  );
}
