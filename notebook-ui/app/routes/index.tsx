import "./styles/index.css";
import NotebookCollection, {
  type Notebook,
} from "~/components/notebook-collection/NotebookCollection";
import { useEffect, useState } from "react";
import type { Route } from "./+types";
import type { NotebookResponse } from "~/api/types/notebook-response";
import { toNotebook } from "~/api/types/map-response";
import { fetchNotebooks } from "~/api/services/notebook-service";

const testNotebooks: Notebook[] = [
  {
    notebookId: "1",
    title: "Assignment 1",
    created: new Date(),
    modified: new Date(),
    cellCount: 5,
  },
  {
    notebookId: "2",
    title: "Assignment 2 - Problem A",
    created: new Date(),
    modified: new Date(),
    cellCount: 2,
  },
  {
    notebookId: "3",
    title: "Assignment 2 - Problem B",
    created: new Date(),
    modified: new Date(),
    cellCount: 1,
  },
];

export function loader() {
  return {
    notebooks: fetchNotebooks(),
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      const data: NotebookResponse[] = await loaderData.notebooks;
      console.log(data);
      setNotebooks(
        data.map((response: NotebookResponse) => toNotebook(response)),
      );
    };
    fetchNotebooks();
  }, []);

  return (
    <div>
      <NotebookCollection notebooks={notebooks} />
    </div>
  );
}
