import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { ListItemButton, ListItemText } from "@mui/material";
import { v4 } from "uuid";
import { insertAtSelected } from "~/state/notebook-slices";
import useGlobalKeyPress from "~/hooks/global-key-press";

export interface OperatorButtonProps {
  symbol: string;
  operator: string;
}

export default function OperatorButton({
  symbol,
  operator,
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
              operator: "EMPTY",
              value: { num: 20 },
              inputs: [],
            },
          ],
        }),
      );
    }
  };

  useGlobalKeyPress([symbol], (e) => {
    insertFormula(operator);
  });

  return (
    <ListItemButton onClick={() => insertFormula(operator)}>
      <ListItemText primary={symbol} />
    </ListItemButton>
  );
}
