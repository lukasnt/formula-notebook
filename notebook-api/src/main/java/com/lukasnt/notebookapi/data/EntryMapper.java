package com.lukasnt.notebookapi.data;

import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Notebook;

import java.util.List;

public class EntryMapper {

    public static Notebook toNotebook(NotebookEntry notebookEntry) {
        return new Notebook(notebookEntry.notebookId(), notebookEntry.title(), notebookEntry.created());
    }

    public static Notebook toNotebook(NotebookEntry notebookEntry, List<CellEntry> cellEntries) {
        return new Notebook(
            notebookEntry.notebookId(),
            notebookEntry.title(),
            notebookEntry.created(),
            cellEntries.stream().map(EntryMapper::toCell).toList()
        );
    }

    public static Cell toCell(CellEntry cellEntry) {
        return new Cell(cellEntry.notebookId(), cellEntry.cellId());
    }

}
