package com.lukasnt.notebookapi.data;

import com.lukasnt.notebookapi.controllers.RequestMapper;
import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.Notebook;
import com.lukasnt.notebookapi.response.OperatorID;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class EntryMapper {

    public static Notebook toNotebook(NotebookEntry notebookEntry) {
        return new Notebook(notebookEntry.notebookId(), notebookEntry.title(), notebookEntry.created());
    }

    public static Notebook toNotebook(NotebookEntry notebookEntry, List<CellEntry> cellEntries, List<FormulaEntry> formulaEntries) {
        var formulasByCell = formulaEntries.stream()
            .collect(Collectors.groupingBy(FormulaEntry::cellId));
        return new Notebook(
            notebookEntry.notebookId(),
            notebookEntry.title(),
            notebookEntry.created(),
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

}
