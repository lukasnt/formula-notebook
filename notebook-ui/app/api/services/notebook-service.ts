import type { NotebookResponse } from "~/api/types/notebook-response";
import type { CellData } from "~/components/notebook/Cell";

export const apiUrl = (): string => {
  const apiHost: string = import.meta.env.VITE_API_HOSTNAME || "localhost";
  const apiPort: string = import.meta.env.VITE_API_PORT || "8080";
  return `http://${apiHost}:${apiPort}/api`;
};

export const fetchNotebooks = async (): Promise<NotebookResponse[]> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks`, {});
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchNotebook = async (
  notebookId: string,
): Promise<NotebookResponse> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}`, {});
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const saveNotebook = async (
  notebookId: string,
  data: string,
): Promise<NotebookResponse> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}`, {
      method: "PUT",
      body: data,
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const postCell = async (
  notebookId: string,
  data: string,
): Promise<CellData> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}/cell`, {
      method: "POST",
      body: data,
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteCell = async (
  notebookId: string,
  cellId: string,
): Promise<CellData> => {
  try {
    const res = await fetch(
      `${apiUrl()}/notebooks/${notebookId}/cell/${cellId}`,
      {
        method: "DELETE",
      },
    );
    return await res.json();
  } catch (error) {
    throw error;
  }
};
