package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.Notebook;
import com.lukasnt.notebookapi.core.operator.*;
import com.lukasnt.notebookapi.response.*;

import java.util.Arrays;
import java.util.Optional;

public class ResponseMapper {

    public static NotebookResponse mapNotebook(Notebook notebook) {
        return new NotebookResponse(
            notebook.getId(),
            notebook.getTitle(),
            notebook.getCreated(),
            notebook.getCells().values().stream()
                .map(ResponseMapper::mapCell)
                .toList()
        );
    }

    public static NotebookCell mapCell(Cell cell) {
        return new NotebookCell(
            cell.getNotebookId(),
            cell.getId(),
            cell.getName(),
            cell.getUpdated(),
            Optional.ofNullable(cell.getFormula()).map(ResponseMapper::mapFormula).orElse(null),
            new Evaluated(
                "",
                cell.getEvaluated(),
                ""
            )
        );
    }

    public static FormulaTree mapFormula(Formula formula) {
        return new FormulaTree(
            Optional.ofNullable(formula.getOperator())
                .map(ResponseMapper::mapOperator)
                .orElse(OperatorID.CONSTANT),
            Arrays.stream(formula.getInputs()).map(ResponseMapper::mapFormula).toList(),
            null
        );
    }

    public static OperatorID mapOperator(Operator operator) {
        return switch (operator) {
            case Plus _           -> OperatorID.PLUS;
            case Minus _          -> OperatorID.MINUS;
            case Multiplication _ -> OperatorID.MULTIPLICATION;
            case Division _       -> OperatorID.DIVISION;
            case Logarithm _      -> OperatorID.LOGARITHM;
            default               -> OperatorID.CONSTANT;
        };
    }

}
