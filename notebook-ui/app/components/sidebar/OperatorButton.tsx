import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/state/store";
import { ListItemButton, ListItemText } from "@mui/material";
import { v4 } from "uuid";
import { insertAtSelected } from "~/state/notebook-slices";

export interface OperatorButtonProps {
  symbol: string;
  operator: string;
}

export default function OperatorButton({ symbol, operator }: OperatorButtonProps) {
  const selectedCellFormula = useSelector(
    (state: RootState) => state.notebook.rootFormula,
  );

  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  const dispatch = useDispatch();

  return (
    <ListItemButton
      onClick={() => {
        dispatch(
          insertAtSelected({
            id: v4(),
            operator: operator,
            inputs: [
              {
                id: v4(),
                operator: "CONSTANT",
                value: { num: 20 },
                inputs: [],
              },
            ],
          }),
        );
      }}
    >
      <ListItemText primary={symbol} />
    </ListItemButton>
  );
}
