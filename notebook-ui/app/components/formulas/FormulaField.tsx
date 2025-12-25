import { TextField } from "@mui/material";
import { useState } from "react";

export default function FormulaField() {
  const [activeInput, setActiveInput] = useState(false);
  const [value, setValue] = useState("10");

  return (
    <span
      onMouseOver={() => setActiveInput(true)}
      onMouseLeave={() => setActiveInput(false)}
    >
      {activeInput ? (
        <TextField
          name="name"
          variant="filled"
          size="small"
          hiddenLabel
          style={{ minWidth: 35, maxWidth: 50 }}
          slotProps={{
            htmlInput: {
              style: {
                paddingBottom: 1,
                paddingTop: 1,
              },
            },
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span>{value}</span>
      )}
    </span>
  );
}
