package com.lukasnt.notebookapi.core;

import com.lukasnt.notebookapi.controllers.ResponseMapper;
import com.lukasnt.notebookapi.database.EntryMapper;
import com.lukasnt.notebookapi.database.NotebookRepository;
import com.lukasnt.notebookapi.models.NotebookCell;

import java.util.HashMap;
import java.util.List;

public class NotebookService {

    private final HashMap<String, Notebook> notebookCache;
    private final NotebookRepository repository;

    public NotebookService(NotebookRepository repository) {
        this.repository = repository;
        notebookCache = new HashMap<>();
    }

    public List<Notebook> getAllNotebooks() {
        return repository.getAllNotebooks().stream().map(EntryMapper::toNotebook).toList();
    }

    public NotebookCell createCell(String notebookId) {
        Notebook notebook = this.getNotebook(notebookId);
        Cell cell = notebook.createCell();
        repository.insertCell(EntryMapper.toCellEntry(cell));
        return ResponseMapper.mapCell(cell);
    }

    public NotebookCell deleteCell(String notebookId, String cellId) {
        Notebook notebook = this.getNotebook(notebookId);
        Cell cell = notebook.deleteCell(cellId);
        repository.deleteCell(EntryMapper.toCellEntry(cell));
        return ResponseMapper.mapCell(cell);
    }

    public Notebook getNotebook(String id) throws IllegalArgumentException {
        if (notebookCache.containsKey(id)) {
            return notebookCache.get(id);
        }
        var storedNotebook = repository.getNotebook(id);
        if (storedNotebook != null) {
            var notebook = EntryMapper.toNotebook(storedNotebook, repository.getCells(id), repository.getFormulas(id));
            notebookCache.put(id, notebook);
            return notebook;
        } else {
            throw new IllegalArgumentException(String.format("Notebook with id %s not found", id));
        }
    }

}
