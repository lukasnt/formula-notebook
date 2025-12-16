package com.lukasnt.notebookapi.reponse;

public record OperatorInfo(
    OperatorID operatorId,
    OperatorType type,
    String notation
) {

    public static final OperatorInfo PLUS = info(OperatorID.PLUS, OperatorType.BINARY, "a + b");
    public static final OperatorInfo MINUS = info(OperatorID.MINUS, OperatorType.BINARY, "a - b");


    public static OperatorInfo info(OperatorID operatorId, OperatorType operatorType, String notation) {
        return new OperatorInfo(operatorId, operatorType, notation);
    }
}
