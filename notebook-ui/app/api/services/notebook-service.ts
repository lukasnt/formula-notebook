import type { NotebookResponse } from "~/api/types/notebook-response";

export const apiUrl = (): string => {
  const apiHost: string = import.meta.env.VITE_API_HOSTNAME || "localhost";
  const apiPort: string = import.meta.env.VITE_API_PORT || "8080";
  return `http://${apiHost}:${apiPort}/api`;
}

export const fetchNotebooks = (): Promise<NotebookResponse[]> => {
  return fetch(`${apiUrl()}/notebooks`, {})
    .then((res) => res.json())
    .catch((error) => console.log(error));
}