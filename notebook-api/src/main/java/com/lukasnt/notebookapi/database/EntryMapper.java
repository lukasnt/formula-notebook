package com.lukasnt.notebookapi.database;

import com.lukasnt.notebookapi.controllers.RequestMapper;
import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.Notebook;
import com.lukasnt.notebookapi.models.OperatorID;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.lukasnt.notebookapi.controllers.ResponseMapper.mapOperator;

public class EntryMapper {

    public static Notebook toNotebook(NotebookEntry notebookEntry) {
        return new Notebook(notebookEntry.notebookId(), notebookEntry.title(), notebookEntry.created(), notebookEntry.modified(), notebookEntry.cellCount());
    }

    public static Notebook toNotebook(NotebookEntry notebookEntry, List<CellEntry> cellEntries, List<FormulaEntry> formulaEntries) {
        var formulasByCell = formulaEntries.stream()
            .collect(Collectors.groupingBy(FormulaEntry::cellId));
        return new Notebook(
            notebookEntry.notebookId(),
            notebookEntry.title(),
            notebookEntry.created(),
            notebookEntry.modified(),
            cellEntries.stream()
                .map(cellEntry -> toCell(cellEntry, formulasByCell.getOrDefault(cellEntry.cellId(), Collections.emptyList())))
                .toList()
        );
    }

    public static Cell toCell(CellEntry cellEntry, List<FormulaEntry> formulaEntries) {
        var formulasIndex = formulaEntries.stream()
            .collect(Collectors.toMap(FormulaEntry::formulaId, Function.identity()));
        var rootFormula = formulasIndex.get(cellEntry.formula());
        return new Cell(
            cellEntry.notebookId(),
            cellEntry.cellId(),
            cellEntry.symbol(),
            Optional.ofNullable(rootFormula)
                .map(formula -> toFormula(formula, formulasIndex))
                .orElse(null),
            cellEntry.textContent(),
            cellEntry.evaluated()
        );
    }

    public static Formula toFormula(FormulaEntry formulaEntry, Map<UUID, FormulaEntry> formulasIndex) {
        return new Formula(
            String.valueOf(formulaEntry.formulaId()),
            RequestMapper.mapOperator(OperatorID.valueOf(formulaEntry.operator()), formulaEntry.value()),
            Arrays.stream(formulaEntry.inputs())
                .map(formulasIndex::get)
                .map(inputEntry -> toFormula(inputEntry, formulasIndex))
                .toArray(Formula[]::new),
            formulaEntry.value()
        );
    }

    public static NotebookEntry toNotebookEntry(Notebook notebook) {
        return new NotebookEntry(
            null,
            notebook.getId(),
            notebook.getTitle(),
            notebook.getCreated(),
            notebook.getModified(),
            notebook.getCellCount()
        );
    }

    public static CellEntry toCellEntry(Cell cell) {
        return new CellEntry(
            null,
            cell.getId(),
            cell.getNotebookId(),
            cell.getSymbol(),
            cell.getUpdated(),
            cell.getTextContent(),
            Optional.ofNullable(cell.getFormula()).map(Formula::getId).map(UUID::fromString).orElse(null),
            cell.getEvaluated()
        );
    }

    public static FormulaEntry toFormulaEntry(Formula formula, String cellId) {
        return new FormulaEntry(
            null,
            UUID.fromString(formula.getId()),
            UUID.fromString(cellId),
            mapOperator(formula.getOperator()).toString(),
            Arrays.stream(formula.getInputs())
                .map(Formula::getId)
                .map(UUID::fromString)
                .toArray(UUID[]::new),
            formula.getValue(),
            ""
        );
    }
}
