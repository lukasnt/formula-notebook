import { Outlet } from "react-router";
import "./styles/index.css";
import Topbar from "~/components/topbar/Topbar";

export default function TopbarPage() {
  return (
    <div>
      <Topbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
