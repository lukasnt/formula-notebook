package com.lukasnt.notebookapi.models;

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
        info(OperatorID.LOGARITHM, OperatorType.UNARY, Logarithm.operator().notation()),
        info(OperatorID.SQUARED, OperatorType.UNARY, Squared.operator().notation()),
        info(OperatorID.POWER, OperatorType.BINARY, Power.operator().notation()),
        info(OperatorID.SQRT, OperatorType.UNARY, SquareRoot.operator().notation()),
        info(OperatorID.CUBE_ROOT, OperatorType.UNARY, CubeRoot.operator().notation()),
        info(OperatorID.ABS, OperatorType.UNARY, Absolute.operator().notation()),
        info(OperatorID.CEIL, OperatorType.UNARY, Ceil.operator().notation()),
        info(OperatorID.FLOOR, OperatorType.UNARY, Floor.operator().notation()),
        info(OperatorID.PI, OperatorType.NULLARY, Pi.operator().notation()),
        info(OperatorID.E, OperatorType.NULLARY, Euler.operator().notation()),
        info(OperatorID.GR, OperatorType.NULLARY, GoldenRatio.operator().notation())
    );

    public static List<OperatorInfo> operators() {
        return operators;
    }

    public static OperatorInfo info(OperatorID operatorId, OperatorType operatorType, String notation) {
        return new OperatorInfo(operatorId, operatorType, notation);
    }
}
