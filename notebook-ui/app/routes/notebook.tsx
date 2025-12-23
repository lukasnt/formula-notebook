import "./styles/notebook-page.css";
import Sidebar from "~/components/sidebar/Sidebar";
import Notebook, { type NotebookProps } from "~/components/notebook/Notebook";
import { fetchNotebook, postCell } from "~/api/services/notebook-service";
import { toNotebook } from "~/api/types/map-response";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initNotebook } from "~/providers/notebook-slices";
import type { Route } from "./+types/notebook";
import { executeAction } from "~/routes/actions/notebook-actions";

export async function loader({ params }: Route.LoaderArgs) {
  const data: NotebookProps = toNotebook(await fetchNotebook(params.id));
  return {
    notebook: data,
  };
}
export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(formData);
  return await executeAction(
    formData.get("action") as string,
    params.id,
    formData,
  );
}

export default function NotebookPage({ loaderData }: Route.ComponentProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initNotebook(loaderData.notebook));
  }, []);

  return (
    <div className="notebook-page-container">
      <div className="sidebar-space">
        <Sidebar />
      </div>
      <div className="notebook-content-container">
        <Notebook />
      </div>
    </div>
  );
}
