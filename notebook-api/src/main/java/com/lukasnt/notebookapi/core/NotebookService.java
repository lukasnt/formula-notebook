package com.lukasnt.notebookapi.core;

import com.lukasnt.notebookapi.controllers.RequestMapper;
import com.lukasnt.notebookapi.controllers.ResponseMapper;
import com.lukasnt.notebookapi.database.CellEntry;
import com.lukasnt.notebookapi.database.EntryMapper;
import com.lukasnt.notebookapi.database.FormulaEntry;
import com.lukasnt.notebookapi.database.NotebookRepository;
import com.lukasnt.notebookapi.models.NotebookCell;
import com.lukasnt.notebookapi.models.NotebookData;

import java.time.ZonedDateTime;
import java.util.ArrayList;
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

    public NotebookData createNotebook() {
        var notebook = new Notebook();
        repository.insertNotebook(EntryMapper.toNotebookEntry(notebook));
        notebookCache.put(notebook.getId().toString(), notebook);
        return ResponseMapper.mapNotebook(notebook);
    }

    public NotebookData saveNotebook(NotebookData notebookData) {
        var notebook = RequestMapper.mapNotebook(notebookData);
        notebook.setModified(ZonedDateTime.now());
        notebookCache.put(notebook.getId().toString(), notebook);
        repository.replaceNotebook(EntryMapper.toNotebookEntry(notebook));

        List<CellEntry> cellEntries = notebook.getCells().stream()
            .map(EntryMapper::toCellEntry).toList();
        repository.insertCells(String.valueOf(notebook.getId()), cellEntries);

        List<FormulaEntry> formulaEntries = new ArrayList<>();
        for (Cell cell : notebook.getCells()) {
            if (cell.getFormula() != null) {
                var subFormulas = cell.getFormula().collectSubFormulas().stream()
                    .map(formula -> EntryMapper.toFormulaEntry(formula, String.valueOf(cell.getId())))
                    .toList();
                formulaEntries.addAll(subFormulas);
            }
        }
        repository.insertFormulas(formulaEntries);

        return ResponseMapper.mapNotebook(notebook);
    }

    public NotebookData runAllCells(NotebookData notebookData) {
        var notebook = RequestMapper.mapNotebook(this.saveNotebook(notebookData));
        List<CellEntry> cellEntries = notebook.evaluateCells().stream()
            .map(EntryMapper::toCellEntry).toList();
        notebookCache.put(notebook.getId().toString(), notebook);
        repository.updateNotebook(EntryMapper.toNotebookEntry(notebook));
        repository.updateCells(cellEntries);
        return ResponseMapper.mapNotebook(notebook);
    }

    public NotebookData clearOutput(NotebookData notebookData) {
        var notebook = RequestMapper.mapNotebook(this.saveNotebook(notebookData));
        List<CellEntry> cellEntries = notebook.clearOutput().stream()
            .map(EntryMapper::toCellEntry).toList();
        notebookCache.put(notebook.getId().toString(), notebook);
        repository.updateNotebook(EntryMapper.toNotebookEntry(notebook));
        repository.updateCells(cellEntries);
        return ResponseMapper.mapNotebook(notebook);
    }

    public boolean deleteNotebook(String notebookId) {
        boolean removed = repository.deleteNotebook(notebookId);
        if (removed) {
            notebookCache.remove(notebookId);
        }
        return removed;
    }

    public NotebookCell createCell(String notebookId) {
        Notebook notebook = this.getNotebook(notebookId);
        Cell cell = notebook.createCell();
        repository.insertCell(EntryMapper.toCellEntry(cell));
        repository.updateNotebook(EntryMapper.toNotebookEntry(notebook));
        return ResponseMapper.mapCell(cell);
    }

    public NotebookCell deleteCell(String notebookId, String cellId) {
        Notebook notebook = this.getNotebook(notebookId);
        Cell cell = notebook.deleteCell(cellId);
        repository.deleteCell(EntryMapper.toCellEntry(cell));
        repository.updateNotebook(EntryMapper.toNotebookEntry(notebook));
        return ResponseMapper.mapCell(cell);
    }

    public NotebookCell replaceEvaluateCell(String notebookId, NotebookCell cellData) {
        Notebook notebook = this.getNotebook(notebookId);
        Cell cell = RequestMapper.mapCell(cellData);
        notebook.replaceCellFormula(String.valueOf(cell.getId()), cell.getFormula());

        Cell evaluated = notebook.evaluateCell(String.valueOf(cell.getId()));
        repository.replaceCell(EntryMapper.toCellEntry(evaluated));

        var subFormulas = evaluated.getFormula().collectSubFormulas().stream()
            .map(formula -> EntryMapper.toFormulaEntry(formula, String.valueOf(cell.getId())))
            .toList();
        repository.insertFormulas(subFormulas);

        repository.updateNotebook(EntryMapper.toNotebookEntry(notebook));
        return ResponseMapper.mapCell(evaluated);
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
