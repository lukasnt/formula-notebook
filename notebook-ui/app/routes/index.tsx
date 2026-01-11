import "./styles/index.css";
import NotebookCollection from "~/components/notebook-collection/NotebookCollection";
import { useEffect, useState } from "react";
import type { Route } from "./+types";
import { fetchNotebooks } from "~/api/services/notebook-service";
import type { NotebookData } from "~/api/types/notebook-data";
import NotebookSearchBar from "~/components/search/NotebookSearchBar";
import { useFetcher, useNavigate } from "react-router";
import {
  CREATE_NOTEBOOK,
  executeAction,
  type NotebookAction,
} from "~/routes/actions/notebook-actions";

export async function action({
  request,
}: Route.ActionArgs): Promise<NotebookAction> {
  const formData = await request.formData();
  return await executeAction(
    formData.get("actionType") as string,
    "",
    formData,
  );
}

export async function loader() {
  return {
    notebooks: await fetchNotebooks(),
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [notebooks, setNotebooks] = useState<NotebookData[]>([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const fetcher = useFetcher<NotebookAction>();

  useEffect(() => {
    setNotebooks(loaderData.notebooks);
  }, []);

  useEffect(() => {
    const notebook = fetcher.data?.notebookData as NotebookData;
    if (fetcher.data?.actionType === CREATE_NOTEBOOK && notebook) {
      navigate(`notebooks/${notebook.notebookId}`);
    }
  }, [fetcher.data?.notebookData]);

  return (
    <div className="content-container">
      <NotebookSearchBar
        onQueryChange={setFilter}
        onCreateSubmit={() => {
          fetcher.submit({ actionType: CREATE_NOTEBOOK }, { method: "POST" });
        }}
      />
      <NotebookCollection
        notebooks={notebooks.filter((notebook) =>
          notebook.title.toLowerCase().includes(filter.toLowerCase()),
        )}
      />
    </div>
  );
}
