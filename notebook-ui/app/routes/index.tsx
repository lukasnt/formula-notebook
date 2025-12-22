import "./styles/index.css";
import NotebookCollection from "~/components/notebook-collection/NotebookCollection";
import { useEffect, useState } from "react";
import type { Route } from "./+types";
import type { NotebookResponse } from "~/api/types/notebook-response";
import { toNotebook } from "~/api/types/map-response";
import { fetchNotebooks } from "~/api/services/notebook-service";
import type { NotebookProps } from "~/components/notebook/Notebook";

export async function loader() {
  return {
    notebooks: await fetchNotebooks(),
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [notebooks, setNotebooks] = useState<NotebookProps[]>([]);

  useEffect(() => {
    setNotebooks(
      loaderData.notebooks.map((response: NotebookResponse) =>
        toNotebook(response),
      ),
    );
  }, []);

  return (
    <div>
      <NotebookCollection notebooks={notebooks} />
    </div>
  );
}
