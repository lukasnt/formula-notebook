package com.lukasnt.notebookapi.database;

import java.util.List;

public interface NotebookRepository {

    List<NotebookEntry> getAllNotebooks();
    NotebookEntry getNotebook(String id);
    List<CellEntry> getCells(String notebookId);
    List<FormulaEntry> getFormulas(String notebookId);

    NotebookEntry insertNotebook(NotebookEntry notebook);
    CellEntry insertCell(CellEntry cell);
    List<CellEntry> insertCells(String notebookId, List<CellEntry> cell);
    List<FormulaEntry> insertFormulas(List<FormulaEntry> formulas);

    NotebookEntry replaceNotebook(NotebookEntry notebook);
    CellEntry replaceCell(CellEntry cell);
    List<CellEntry> replaceCells(List<CellEntry> cells);

    boolean deleteNotebook(String notebookId);
    boolean deleteCell(CellEntry cell);
}
