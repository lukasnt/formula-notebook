import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/topbar.tsx", [
    index("routes/index.tsx"),
    route("notebook", "routes/notebook.tsx"),
  ]),
] satisfies RouteConfig;
