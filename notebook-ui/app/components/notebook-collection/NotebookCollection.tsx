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
import type { NotebookData } from "~/api/types/notebook-data";
import { formatDistance } from "date-fns";

interface NotebookCollectionProps {
  notebooks: NotebookData[];
}

export default function NotebookCollection({
  notebooks,
}: NotebookCollectionProps) {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return formatDistance(date, new Date(), { addSuffix: true });
  };

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
                {"Created " + formatDate(new Date(notebook.created))}
              </TableCell>
              <TableCell>
                {"Modified " + formatDate(new Date(notebook.modified))}
              </TableCell>
              <TableCell>{notebook.cellCount + " cells"}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
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
