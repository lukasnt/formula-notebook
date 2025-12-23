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
import type { NotebookProps } from "~/components/notebook/Notebook";

interface NotebookCollectionProps {
  notebooks: NotebookProps[];
}

export default function NotebookCollection({
  notebooks,
}: NotebookCollectionProps) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notebooks.map((notebook) => (
            <TableRow
              hover
              onClick={() => navigate(`notebooks/${notebook.notebookId}`)}
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
                {"Created " + new Date(notebook.created).toDateString()}
              </TableCell>
              <TableCell>
                {"Modified " + new Date(notebook.modified).toDateString()}
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
