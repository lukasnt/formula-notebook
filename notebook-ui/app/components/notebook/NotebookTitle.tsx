import { Paper, TextField } from "@mui/material";

import "./notebook.css";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch } from "react-redux";
import { setTitle } from "~/providers/notebook-slices";

export interface NotebookTitleProps {
  notebookId: string;
}

export default function NotebookTitle({ notebookId }: NotebookTitleProps) {
  const { notebook } = useLoaderData();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(notebook.title);
  }, [notebook]);

  useEffect(() => {
    dispatch(setTitle(value));
  }, [value]);

  return (
    <Paper className={"title-container"}>
      <TextField
        variant="standard"
        color={"primary"}
        fullWidth={true}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        slotProps={{
          input: { style: { fontSize: 24 } },
        }}
      />
    </Paper>
  );
}
