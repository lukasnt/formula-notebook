import { Paper } from "@mui/material";

import "./styles/notebook.css";
import Sidebar from "~/components/sidebar/Sidebar";

export default function Notebook() {
  return (
    <div className="notebook-page-container">
      <div className="sidebar-space">
        <Sidebar />
      </div>
      <Paper className={"notebook-container"}>Lore ipsum dolor sit amet</Paper>
    </div>
  );
}
