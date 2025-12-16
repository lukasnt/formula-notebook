package com.lukasnt.notebookapi.reponse;

import com.lukasnt.notebookapi.core.operator.*;

import java.util.List;

public record OperatorInfo(
    OperatorID id,
    OperatorType type,
    String notation
) {

    private static final List<OperatorInfo> operators = List.of(
        info(OperatorID.PLUS, OperatorType.BINARY, Plus.operator().notation()),
        info(OperatorID.MINUS, OperatorType.BINARY, Minus.operator().notation()),
        info(OperatorID.MULTIPLICATION, OperatorType.BINARY, Multiplication.operator().notation()),
        info(OperatorID.DIVISION, OperatorType.BINARY, Division.operator().notation()),
        info(OperatorID.LOGARITHM, OperatorType.UNARY, Logarithm.operator().notation())
    );

    public static List<OperatorInfo> operators() {
        return operators;
    }

    public static OperatorInfo info(OperatorID operatorId, OperatorType operatorType, String notation) {
        return new OperatorInfo(operatorId, operatorType, notation);
    }
}
