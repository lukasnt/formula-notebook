package com.lukasnt.notebookapi.core;

import com.lukasnt.notebookapi.data.EntryMapper;
import com.lukasnt.notebookapi.data.NotebookRepository;

import java.util.HashMap;

public class NotebookManager {

    private HashMap<String, Notebook> notebooks;
    private NotebookRepository repository;

    public NotebookManager(NotebookRepository repository) {
        this.repository = repository;
        notebooks = new HashMap<>();
        notebooks.put("1", new Notebook("1"));
    }

    public Notebook getCachedNotebook(String id) throws IllegalArgumentException {
        return findNotebook(id);
    }

    public Notebook getStoredNotebook(String id) throws IllegalArgumentException {
        var notebook = repository.getNotebook(id);
        if (notebook != null) {
            return EntryMapper.toNotebook(repository.getNotebook(id), repository.getCells(id));
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
