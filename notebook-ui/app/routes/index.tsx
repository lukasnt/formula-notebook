import "./styles/index.css";
import NotebookCollection from "~/components/notebook-collection/NotebookCollection";
import { useEffect, useState } from "react";
import type { Route } from "./+types";
import { fetchNotebooks } from "~/api/services/notebook-service";
import type { NotebookData } from "~/api/types/notebook-data";
import NotebookSearchBar from "~/components/search/NotebookSearchBar";

export async function loader() {
  return {
    notebooks: await fetchNotebooks(),
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [notebooks, setNotebooks] = useState<NotebookData[]>([]);

  useEffect(() => {
    setNotebooks(loaderData.notebooks);
  }, []);

  return (
    <div>
      <NotebookSearchBar />
      <NotebookCollection notebooks={notebooks} />
    </div>
  );
}
