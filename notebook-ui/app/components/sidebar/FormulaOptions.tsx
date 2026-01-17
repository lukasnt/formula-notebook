import { List, ListSubheader } from "@mui/material";
import UnselectButton from "~/components/sidebar/UnselectButton";
import DeleteButton from "~/components/sidebar/DeleteButton";

export default function FormulaOptions() {
  return (
    <List
      subheader={<ListSubheader component="div">Formula options</ListSubheader>}
    >
      <List sx={{ pl: 4 }}>
        <UnselectButton />
        <DeleteButton />
      </List>
    </List>
  );
}
