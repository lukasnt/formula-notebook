package com.lukasnt.notebookapi.core;

import java.util.HashMap;

public class NotebookManager {

    private HashMap<String, Notebook> notebooks;

    public NotebookManager() {
        notebooks = new HashMap<>();
        notebooks.put("1", new Notebook("1"));
    }

    public Notebook getNotebook(String id) throws IllegalArgumentException {
        return findNotebook(id);
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
