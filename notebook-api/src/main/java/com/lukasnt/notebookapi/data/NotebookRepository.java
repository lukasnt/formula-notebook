package com.lukasnt.notebookapi.data;

import com.lukasnt.notebookapi.core.Cell;

import java.util.List;

public interface NotebookRepository {

    List<NotebookEntry> getAllNotebooks();
    NotebookEntry getNotebook(String id);
    List<CellEntry> getCells(String notebookId);

    NotebookEntry insertNotebook(NotebookEntry notebook);
    CellEntry insertCell(CellEntry cell);
    CellEntry replaceCell(CellEntry cell);
    List<CellEntry> replaceCells(List<CellEntry> cells);

    NotebookEntry deleteNotebook(NotebookEntry notebook);
    NotebookEntry deleteCell(CellEntry cell);
}
