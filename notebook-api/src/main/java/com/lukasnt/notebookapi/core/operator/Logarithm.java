package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Logarithm implements Operator {

    private static final Logarithm INSTANCE = new Logarithm();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "ln($1)";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) throws IllegalArgumentException {
        OperatorUtils.checkArguments(this, args);
        return BigDecimal.valueOf(Math.log(args[0].doubleValue()));
    }

    public static Logarithm operator() {
        return INSTANCE;
    }

    public static Formula logarithm(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }
}
