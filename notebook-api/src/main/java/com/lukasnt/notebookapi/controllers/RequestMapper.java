package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.Cell;
import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.Notebook;
import com.lukasnt.notebookapi.core.operator.*;
import com.lukasnt.notebookapi.models.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

public class RequestMapper {

    public static Notebook mapNotebook(NotebookData notebookData) {
        return new Notebook(
            notebookData.notebookId(),
            notebookData.title(),
            notebookData.created(),
            notebookData.modified(),
            notebookData.cells().stream().map(RequestMapper::mapCell).toList()
        );
    }

    public static Cell mapCell(NotebookCell cellData) {
        return new Cell(
            cellData.notebookId(),
            cellData.cellId(),
            cellData.symbol(),
            mapFormulaTree(cellData.formula()),
            cellData.textContent(),
            Optional.ofNullable(cellData.evaluated()).map(Evaluated::num).orElse(null)
        );
    }

    public static Formula mapFormulaTree(FormulaTree formulaTree) {
        var id = Optional.ofNullable(formulaTree).map(FormulaTree::id).orElse(null);
        var input = Optional.ofNullable(formulaTree).map(FormulaTree::inputs).orElse(Collections.emptyList());
        var mappedInput = input.stream()
            .map(RequestMapper::mapFormulaTree)
            .toArray(Formula[]::new);
        var constValue = Optional.ofNullable(formulaTree)
            .map(FormulaTree::value).map(Evaluated::num)
            .orElse(BigDecimal.ZERO);
        var operatorId = Optional.ofNullable(formulaTree)
            .map(FormulaTree::operator)
            .orElse(OperatorID.CONSTANT);
        return new Formula(
            id,
            RequestMapper.mapOperator(operatorId, constValue),
            mappedInput,
            constValue
        );
    }

    public static Operator mapOperator(OperatorID operatorId, BigDecimal constValue) {
        return switch (operatorId) {
            case OperatorID.CONSTANT       -> Constant.of(constValue);
            case OperatorID.PLUS           -> Plus.operator();
            case OperatorID.MINUS          -> Minus.operator();
            case OperatorID.MULTIPLICATION -> Multiplication.operator();
            case OperatorID.DIVISION       -> Division.operator();
            case OperatorID.LOGARITHM      -> Logarithm.operator();
            case OperatorID.SQUARED        -> Squared.operator();
            case OperatorID.POWER          -> Power.operator();
            case OperatorID.SQRT           -> SquareRoot.operator();
            case OperatorID.CUBE_ROOT      -> CubeRoot.operator();
            case OperatorID.PI             -> Pi.operator();
            case OperatorID.E              -> Euler.operator();
            case OperatorID.GR             -> GoldenRatio.operator();
            case null                      -> Constant.of(BigDecimal.ZERO);
        };
    }

}
