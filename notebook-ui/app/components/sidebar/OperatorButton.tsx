import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListItemText } from "@mui/material";
import { v4 } from "uuid";
import { insertAtSelected } from "~/state/notebook-slices";
import useGlobalKeyPress from "~/hooks/global-key-press";

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
        insertAtSelected({
          id: v4(),
          operator: operator,
          inputs: [
            {
              id: v4(),
              operator: "INPUT",
              value: { num: 20 },
              inputs: [],
            },
          ],
        }),
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
            textAlign: "center"
          }}
        >
          {symbol}
        </span>
    </Button>
  );
}
