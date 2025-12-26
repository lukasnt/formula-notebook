package com.lukasnt.notebookapi.data;

import java.util.List;

public interface NotebookRepository {

    List<NotebookEntry> getAllNotebooks();
    NotebookEntry getNotebook(String id);
    List<CellEntry> getCells(String notebookId);
    List<FormulaEntry> getFormulas(String notebookId);

    NotebookEntry insertNotebook(NotebookEntry notebook);
    CellEntry insertCell(CellEntry cell);
    List<FormulaEntry> insertFormulas(List<FormulaEntry> formulas);
    CellEntry replaceCell(CellEntry cell);
    List<CellEntry> replaceCells(List<CellEntry> cells);

    NotebookEntry deleteNotebook(NotebookEntry notebook);
    NotebookEntry deleteCell(CellEntry cell);
}
