import "./styles/index.css";
import NotebookCollection, {
  type Notebook,
} from "~/components/notebooks/NotebookCollection";

const testNotebooks: Notebook[] = [
  {
    id: "1",
    title: "Assignment 1",
    created: new Date(),
    modified: new Date(),
    cellCount: 5,
  },
  {
    id: "2",
    title: "Assignment 2 - Problem A",
    created: new Date(),
    modified: new Date(),
    cellCount: 2,
  },
  {
    id: "3",
    title: "Assignment 2 - Problem B",
    created: new Date(),
    modified: new Date(),
    cellCount: 1,
  },
];

export default function Index() {
  return (
    <div className="home">
      <NotebookCollection notebooks={testNotebooks} />
    </div>
  );
}
