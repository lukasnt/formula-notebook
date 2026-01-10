import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { NoteAdd } from "@mui/icons-material";

interface NotebookSearchBarProps {
  onQueryChange: (query: string) => void;
  onCreateSubmit: () => void;
}

export default function NotebookSearchBar({ onQueryChange, onCreateSubmit }: NotebookSearchBarProps) {
  return (
    <Paper
      component="form"
      style={{
        padding: "2px 4px",
        marginBottom: "0.5em",
        display: "flex",
        alignItems: "center"
      }}
    >
      <IconButton type="button" style={{ padding: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <TextField
        style={{ marginLeft: 1, flex: 1 }}
        placeholder="Search..."
        variant="standard"
        slotProps={{
          input: { disableUnderline: true },
        }}
        fullWidth
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <Divider sx={{ height: 40, margin: 0.5 }} orientation="vertical" />
      <Button
        color="inherit"
        variant="text"
        style={{ padding: "10px", textTransform: "none" }}
        aria-label="directions"
        onClick={onCreateSubmit}
      >
        <NoteAdd fontSize="medium" style={{ marginRight: "0.05em" }} />
        <Typography>New notebook</Typography>
      </Button>
    </Paper>
  );
}
