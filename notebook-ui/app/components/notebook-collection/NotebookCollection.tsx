import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import "./notebook-collection.css";
import DeleteIcon from "@mui/icons-material/Delete";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router";

export interface Notebook {
  notebookId: string;
  title: string;
  created: Date;
  modified: Date;
  cellCount: number;
}

export interface NotebookProps {
  notebooks: Notebook[];
}

export default function NotebookCollection({ notebooks }: NotebookProps) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notebooks.map((notebook) => (
            <TableRow
              hover
              onClick={() => navigate("notebook")}
              style={{ cursor: "pointer" }}
              key={notebook.notebookId}
            >
              <TableCell>
                <BookIcon />
              </TableCell>
              <TableCell>
                <Typography variant={"h6"}>{notebook.title}</Typography>
              </TableCell>
              <TableCell>
                {"Created " + notebook.created.toDateString()}
              </TableCell>
              <TableCell>
                {"Modified " + notebook.modified.toDateString()}
              </TableCell>
              <TableCell>{notebook.cellCount + " cells"}</TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
