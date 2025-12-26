package com.lukasnt.notebookapi.core;

import com.lukasnt.notebookapi.data.EntryMapper;
import com.lukasnt.notebookapi.data.NotebookRepository;

import java.util.HashMap;
import java.util.List;

public class NotebookManager {

    private final HashMap<String, Notebook> notebooks;
    private final NotebookRepository repository;

    public NotebookManager(NotebookRepository repository) {
        this.repository = repository;
        notebooks = new HashMap<>();
    }

    public List<Notebook> getAllNotebooks() {
        return repository.getAllNotebooks().stream().map(EntryMapper::toNotebook).toList();
    }

    public Notebook getCachedNotebook(String id) throws IllegalArgumentException {
        return findNotebook(id);
    }

    public Notebook getStoredNotebook(String id) throws IllegalArgumentException {
        var notebook = repository.getNotebook(id);
        if (notebook != null) {
            return EntryMapper.toNotebook(repository.getNotebook(id), repository.getCells(id), repository.getFormulas(id));
        } else {
            throw new IllegalArgumentException(String.format("Notebook with id %s not found", id));
        }
    }

    private Notebook findNotebook(String id) throws IllegalArgumentException {
        var notebook = notebooks.get(id);
        if (notebook != null) {
            return notebook;
        } else {
            throw new IllegalArgumentException(String.format("Notebook with id %s not found", id));
        }
    }

}
