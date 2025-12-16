package com.lukasnt.notebookapi.core.operator;

import java.math.BigDecimal;

public abstract class OperatorUtils {

    public static void checkArguments(Operator operator, BigDecimal[] arguments) throws IllegalArgumentException {
        if (arguments.length != operator.arity()) {
            throw new IllegalArgumentException("Number of arguments does not match arity of operator");
        }
        for (var arg : arguments) {
            if (arg == null) {
                throw new IllegalArgumentException("Illegal null argument passed");
            }
        }
    }
}
