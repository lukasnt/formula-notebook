package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.Notebook;
import com.lukasnt.notebookapi.core.operator.*;
import com.lukasnt.notebookapi.models.OperatorID;
import com.lukasnt.notebookapi.models.Evaluated;
import com.lukasnt.notebookapi.models.FormulaTree;
import com.lukasnt.notebookapi.models.NotebookCell;
import com.lukasnt.notebookapi.models.NotebookData;

import java.util.Arrays;
import java.util.Optional;

public class ResponseMapper {

    public static NotebookData mapNotebook(Notebook notebook) {
        return new NotebookData(
            notebook.getId(),
            notebook.getTitle(),
            notebook.getCreated(),
            notebook.getModified(),
            notebook.getCellCount(),
            notebook.getCells().stream()
                .map(ResponseMapper::mapCell)
                .toList()
        );
    }

    public static NotebookCell mapCell(Cell cell) {
        return new NotebookCell(
            cell.getNotebookId(),
            cell.getId(),
            cell.getSymbol(),
            cell.getUpdated(),
            Optional.ofNullable(cell.getFormula()).map(ResponseMapper::mapFormula).orElse(null),
            cell.getTextContent(),
            new Evaluated(
                cell.getEvaluated(),
                ""
            )
        );
    }

    public static FormulaTree mapFormula(Formula formula) {
        return new FormulaTree(
            formula.getId(),
            Optional.ofNullable(formula.getOperator())
                .map(ResponseMapper::mapOperator)
                .orElse(OperatorID.CONSTANT),
            Arrays.stream(formula.getInputs()).map(ResponseMapper::mapFormula).toList(),
            new Evaluated(
                formula.getValue(),
                null
            )
        );
    }

    public static OperatorID mapOperator(Operator operator) {
        return switch (operator) {
            case Plus _           -> OperatorID.PLUS;
            case Minus _          -> OperatorID.MINUS;
            case Multiplication _ -> OperatorID.MULTIPLICATION;
            case Division _       -> OperatorID.DIVISION;
            case Logarithm _      -> OperatorID.LOGARITHM;
            case Squared _        -> OperatorID.SQUARED;
            case Power _          -> OperatorID.POWER;
            case SquareRoot _     -> OperatorID.SQRT;
            case CubeRoot _       -> OperatorID.CUBE_ROOT;
            case Absolute _       -> OperatorID.ABS;
            case Ceil _           -> OperatorID.CEIL;
            case Floor _          -> OperatorID.FLOOR;
            case Pi _             -> OperatorID.PI;
            case Euler _          -> OperatorID.E;
            case GoldenRatio _    -> OperatorID.GR;
            default               -> OperatorID.CONSTANT;
        };
    }

}
