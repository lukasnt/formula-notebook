import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TabUnselectedIcon from "@mui/icons-material/TabUnselected";
import { useDispatch } from "react-redux";
import { nullFormula } from "~/state/formula-const";
import { setSelectedFormula } from "~/state/notebook-slices";
import useGlobalKeyPress from "~/hooks/global-key-press";

export default function UnselectButton() {
  const dispatch = useDispatch();

  useGlobalKeyPress(["Escape"], (e) => {
    dispatch(setSelectedFormula(nullFormula));
  })

  return (
    <ListItemButton
      onClick={(e) => {
        dispatch(setSelectedFormula(nullFormula));
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
