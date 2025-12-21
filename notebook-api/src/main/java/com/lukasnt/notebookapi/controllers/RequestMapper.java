package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.Formula;
import com.lukasnt.notebookapi.core.operator.*;
import com.lukasnt.notebookapi.response.Evaluated;
import com.lukasnt.notebookapi.response.FormulaTree;
import com.lukasnt.notebookapi.response.OperatorID;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

public class RequestMapper {

    public static Formula mapFormulaTree(FormulaTree formulaTree) {
        IO.println(formulaTree);
        var input = Optional.ofNullable(formulaTree).map(FormulaTree::input).orElse(Collections.emptyList());
        var mappedInput = input.stream()
            .map(RequestMapper::mapFormulaTree)
            .toArray(Formula[]::new);
        var constValue = Optional.ofNullable(formulaTree)
            .map(FormulaTree::value).map(Evaluated::num)
            .orElse(BigDecimal.ZERO);
        var operatorId = Optional.ofNullable(formulaTree)
            .map(FormulaTree::operatorId)
            .orElse(OperatorID.CONSTANT);
        return new Formula(RequestMapper.mapOperator(operatorId, constValue), mappedInput);
    }

    public static Operator mapOperator(OperatorID operatorId, BigDecimal constValue) {
        return switch (operatorId) {
            case OperatorID.CONSTANT       -> Constant.of(constValue);
            case OperatorID.PLUS           -> Plus.operator();
            case OperatorID.MINUS          -> Minus.operator();
            case OperatorID.MULTIPLICATION -> Multiplication.operator();
            case OperatorID.DIVISION       -> Division.operator();
            case OperatorID.LOGARITHM      -> Logarithm.operator();
            case null                      -> Constant.of(BigDecimal.ZERO);
        };
    }

}
