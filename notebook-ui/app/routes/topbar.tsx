import { Outlet } from "react-router";
import "./styles/index.css";
import Topbar from "~/components/topbar/Topbar";

export default function TopbarPage() {
  return (
    <div className="home">
      <Topbar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}
