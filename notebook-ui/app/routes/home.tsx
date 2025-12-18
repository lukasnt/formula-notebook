import type { Route } from "./+types/home";
import { Paper, Tabs } from "@mui/material";

export function loader() {
  return { name: "React Router" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="home">
      <Tabs>
      </Tabs>
      <Paper variant="outlined">
        <div></div>
      </Paper>
    </div>
  );
}
