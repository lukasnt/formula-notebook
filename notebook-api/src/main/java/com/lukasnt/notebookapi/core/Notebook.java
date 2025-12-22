package com.lukasnt.notebookapi.core;

import java.time.ZonedDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

public class Notebook {

    private final UUID id;
    private final ZonedDateTime created;
    private final String title;
    private final LinkedHashMap<UUID, Cell> cells;
    private ZonedDateTime modified;

    public Notebook(UUID id, String title, ZonedDateTime created) {
        this.id = id;
        this.title = title;
        this.created = created;
        this.cells = new LinkedHashMap<>();
    }

    public Notebook(UUID id, String title, ZonedDateTime created, List<Cell> cells) {
        this(id, title, created);
        cells.forEach(cell -> this.cells.put(cell.getId(), cell));
    }

    public Cell createCell() {
        var cell = new Cell(id, UUID.randomUUID());
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
        return modifyCell(cellId, cell -> cell.setSymbol(cellName));
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

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public LinkedHashMap<UUID, Cell> getCells() {
        return cells;
    }

    public ZonedDateTime getModified() {
        return modified;
    }

}
