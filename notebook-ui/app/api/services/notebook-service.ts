import type { CellData, NotebookData } from "~/api/types/notebook-data";

export const apiUrl = (): string => {
  const apiHost: string = import.meta.env.VITE_API_HOSTNAME || "localhost";
  const apiPort: string = import.meta.env.VITE_API_PORT || "8080";
  return `http://${apiHost}:${apiPort}/api`;
};

export const fetchNotebooks = async (): Promise<NotebookData[]> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks`, {});
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const createNotebook = async (): Promise<NotebookData> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchNotebook = async (
  notebookId: string,
): Promise<NotebookData> => {
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
): Promise<NotebookData> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}`, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const runAllCells = async (
  notebookId: string,
  data: string,
): Promise<NotebookData> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}/runAll`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteNotebook = async (
  notebookId: string,
): Promise<boolean> => {
  try {
    const res = await fetch(`${apiUrl()}/notebooks/${notebookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteCell = async (
  notebookId: string,
  cellId: string,
): Promise<boolean> => {
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

export const runCell = async (
  notebookId: string,
  cellId: string,
  data: string,
): Promise<CellData> => {
  try {
    const res = await fetch(
      `${apiUrl()}/notebooks/${notebookId}/cell/${cellId}`,
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await res.json();
  } catch (error) {
    throw error;
  }
};
