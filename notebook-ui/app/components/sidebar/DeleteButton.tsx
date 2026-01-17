import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeSelected } from "~/state/notebook-slices";
import useGlobalKeyPress from "~/hooks/global-key-press";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RootState } from "~/state/store";

export default function DeleteButton() {
  const dispatch = useDispatch();
  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  useGlobalKeyPress(["Backspace", "Delete"], () => {
    if (selectedFormula) {
      dispatch(removeSelected());
    }
  });

  return (
    <ListItemButton
      onClick={(e) => {
        dispatch(removeSelected());
      }}
    >
      <ListItemText>
        <Typography variant={"subtitle2"} component="div">
          Delete
        </Typography>
      </ListItemText>
      <ListItemIcon>
        <DeleteIcon htmlColor={"black"} />
      </ListItemIcon>
    </ListItemButton>
  );
}
