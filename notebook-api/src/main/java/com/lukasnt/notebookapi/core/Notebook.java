package com.lukasnt.notebookapi.core;

import java.time.ZonedDateTime;
import java.util.LinkedHashMap;
import java.util.List;

public class Notebook {

    private final String id;
    private final ZonedDateTime created;
    private String title;
    private LinkedHashMap<String, Cell> cells;

    private int cellIdCounter = 0;

    public Notebook(String id) {
        this.id = id;
        this.created = ZonedDateTime.now();
        this.cells = new LinkedHashMap<>();
    }

    public Notebook(String id, List<Cell> cells) {
        this(id);
        cells.forEach(cell -> this.cells.put(cell.getId(), cell));
    }

    public Cell createCell() {
        var cell = new Cell(id, String.valueOf(cellIdCounter++));
        cells.put(cell.getId(), cell);
        return cell;
    }

    public List<Cell> evaluateCells() {
        cells.values().forEach(Cell::evaluate);
        return cells.values().stream().toList();
    }

    public Cell evaluateCell(String cellId) throws IllegalArgumentException {
        var cell = findCell(cellId);
        cell.evaluate();
        return cell;
    }

    public Cell replaceCellFormula(String cellId, Formula formula) throws IllegalArgumentException {
        var cell = findCell(cellId);
        cell.replaceFormula(formula);
        return cell;
    }

    public Cell setCellName(String cellId, String cellName) throws IllegalArgumentException {
        var cell = findCell(cellId);
        cell.setName(cellName);
        return cell;
    }

    public Cell deleteCell(String cellId) throws IllegalArgumentException {
        var cell = findCell(cellId);
        cells.remove(cellId);
        return cell;
    }

    private Cell findCell(String cellId) throws IllegalArgumentException {
        var cell = cells.get(cellId);
        if (cell != null) {
            return cell;
        } else {
            throw new IllegalArgumentException(String.format("Cell with id %s not found", cellId));
        }
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
}
