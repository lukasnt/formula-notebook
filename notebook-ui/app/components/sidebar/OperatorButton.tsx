import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { replaceAtSelected } from "~/state/notebook-slices";
import useGlobalKeyPress from "~/hooks/global-key-press";
import { createInputFormula } from "~/components/operators/operators";

export interface OperatorButtonProps {
  operator: string;
  symbol: string;
  keybind?: string;
}

export default function OperatorButton({
  operator,
  symbol,
  keybind,
}: OperatorButtonProps) {
  const dispatch = useDispatch();
  const selectedFormula = useSelector(
    (state: any) => state.notebook.selectedFormula,
  );

  const insertFormula = (operator: string) => {
    if (selectedFormula) {
      dispatch(
        replaceAtSelected(createInputFormula(selectedFormula, operator)),
      );
    }
  };

  useGlobalKeyPress([keybind || ""], (e) => {
    insertFormula(operator);
  });

  return (
    <Button
      onClick={() => insertFormula(operator)}
      style={{
        textAlign: "center",
        textTransform: "none",
        height: 40,
        width: 40,
        marginLeft: 2,
        marginRight: 2,
        fontWeight: "bold",
      }}
      variant="outlined"
      color="inherit"
    >
      <span
        style={{
          fontSize: 20,
          fontFamily: "Latin Modern Math",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {symbol}
      </span>
    </Button>
  );
}
