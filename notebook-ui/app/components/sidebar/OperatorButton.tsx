import "./sidebar.css";
import { useDispatch } from "react-redux";
import { ListItemButton, ListItemText } from "@mui/material";
import { v4 } from "uuid";
import { insertAtSelected } from "~/state/notebook-slices";

export interface OperatorButtonProps {
  symbol: string;
  operator: string;
}

export default function OperatorButton({
  symbol,
  operator,
}: OperatorButtonProps) {
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
                operator: "EMPTY",
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
