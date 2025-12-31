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

export default function FormulaOptions() {
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