import "./styles/notebook-page.css";
import Sidebar from "~/components/sidebar/Sidebar";
import Notebook from "~/components/notebook/Notebook";
import { fetchNotebook } from "~/api/services/notebook-service";
import type { Route } from "./+types/notebook";
import { toNotebook } from "~/api/types/map-response";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    notebook: toNotebook(await fetchNotebook(params.id)),
  };
}

export default function NotebookPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="notebook-page-container">
      <div className="sidebar-space">
        <Sidebar />
      </div>
      <div className="notebook-content-container">
        <Notebook {...loaderData.notebook} />
      </div>
    </div>
  );
}
