package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Absolute implements Operator {

    private static final Absolute INSTANCE = new Absolute();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "|$1|";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) throws IllegalArgumentException {
        OperatorUtils.checkArguments(this, args);
        return args[0].abs();
    }

    public static Absolute operator() {
        return INSTANCE;
    }

    public static Formula absolute(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }
}
