import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TabUnselectedIcon from "@mui/icons-material/TabUnselected";
import { useDispatch } from "react-redux";
import { emptyFormula, setSelectedFormula } from "~/providers/formula-slices";

export default function UnselectButton() {
  const dispatch = useDispatch();

  return (
    <ListItemButton
      onClick={(e) => {
        dispatch(setSelectedFormula(emptyFormula));
      }}
    >
      <ListItemText>
        <Typography variant={"subtitle2"} component="div">
          Unselect
        </Typography>
      </ListItemText>
      <ListItemIcon>
        <TabUnselectedIcon htmlColor={"black"} />
      </ListItemIcon>
    </ListItemButton>
  );
}
