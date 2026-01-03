import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import UnselectButton from "~/components/sidebar/UnselectButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useGlobalKeyPress from "~/hooks/global-key-press";
import { removeSelected } from "~/state/notebook-slices";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/state/store";

export default function FormulaOptions() {
  const dispatch = useDispatch();
  const selectedFormula = useSelector(
    (state: RootState) => state.notebook.selectedFormula,
  );

  useGlobalKeyPress(["Backspace", "Delete"], () => {
      if (selectedFormula) {
        dispatch(removeSelected());
      }
    }
  );

  return (
    <List
      subheader={<ListSubheader component="div">Formula options</ListSubheader>}
    >
      <List sx={{ pl: 4 }}>
        <UnselectButton />
        <ListItemButton>
          <ListItemText>
            <Typography variant={"subtitle2"} component="div">
              Delete
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <DeleteIcon htmlColor={"black"} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </List>
  );
}
