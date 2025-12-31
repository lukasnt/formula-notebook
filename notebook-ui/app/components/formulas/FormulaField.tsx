import { TextField } from "@mui/material";
import { useState } from "react";
import "./formula.css";
import { useDispatch } from "react-redux";
import { replaceAtSelected } from "~/state/notebook-slices";
import { v4 } from "uuid";

export default function FormulaField() {
  const [activeInput, setActiveInput] = useState(true);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

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
            fieldSizing: "content",
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              replaceAtSelected({
                id: v4(),
                operator: "CONSTANT",
                value: { num: parseInt(value) },
                inputs: [],
              }),
            );
            setActiveInput(false);
          }
        }}
      />
    </span>
  );
}
