import { AppBar, Toolbar, Typography } from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import "./topbar.css";
import { NavLink } from "react-router";

export default function Topbar() {
  return (
    <div className={"topbar-spacing"}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <NavLink to={""} className={"logo-link"}>
            <div className={"logo-container"}>
              <CollectionsBookmarkIcon fontSize={"large"} />
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  marginX: "0.25rem",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Formula Notebook
              </Typography>
            </div>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
