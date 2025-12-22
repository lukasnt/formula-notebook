package com.lukasnt.notebookapi.core;

import java.time.ZonedDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.function.Consumer;

public class Notebook {

    private final String id;
    private final ZonedDateTime created;
    private final String title;
    private final LinkedHashMap<String, Cell> cells;
    private ZonedDateTime modified;

    private int cellIdCounter = 0;

    public Notebook(String id, String title, ZonedDateTime created) {
        this.id = id;
        this.title = title;
        this.created = created;
        this.cells = new LinkedHashMap<>();
    }

    public Notebook(String id, String title, ZonedDateTime created, List<Cell> cells) {
        this(id, title, created);
        cells.forEach(cell -> this.cells.put(cell.getId(), cell));
    }

    public Cell createCell() {
        var cell = new Cell(id, String.valueOf(cellIdCounter++));
        cells.put(cell.getId(), cell);
        modified = ZonedDateTime.now();
        return cell;
    }

    public List<Cell> evaluateCells() {
        cells.values().forEach(Cell::evaluate);
        modified = ZonedDateTime.now();
        return cells.values().stream().toList();
    }

    public Cell evaluateCell(String cellId) {
        return modifyCell(cellId, Cell::evaluate);
    }

    public Cell replaceCellFormula(String cellId, Formula formula) {
        return modifyCell(cellId, cell -> cell.replaceFormula(formula));
    }

    public Cell setCellName(String cellId, String cellName) {
        return modifyCell(cellId, cell -> cell.setName(cellName));
    }

    public Cell deleteCell(String cellId) throws IllegalArgumentException {
        return modifyCell(cellId, _ -> cells.remove(cellId));
    }

    private Cell findCell(String cellId) throws IllegalArgumentException {
        var cell = cells.get(cellId);
        if (cell != null) {
            return cell;
        } else {
            throw new IllegalArgumentException(String.format("Cell with id %s not found", cellId));
        }
    }

    private Cell modifyCell(String cellId, Consumer<Cell> cellConsumer) throws IllegalArgumentException {
        var cell = findCell(cellId);
        cellConsumer.accept(cell);
        modified = ZonedDateTime.now();
        return cell;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public LinkedHashMap<String, Cell> getCells() {
        return cells;
    }

    public ZonedDateTime getModified() {
        return modified;
    }

}
