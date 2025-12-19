import "./styles/notebook-page.css";
import Sidebar from "~/components/sidebar/Sidebar";
import Notebook from "~/components/notebook/Notebook";

export default function NotebookPage() {
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
