import type { Route } from "./+types/home";
import {Paper} from "@mui/material";

export function loader() {
  return { name: "React Router" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="home">
        <Paper variant="outlined">
            <div>
                Lore ipsum
            </div>
        </Paper>
    </div>
  );
}
