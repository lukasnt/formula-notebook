package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class Floor implements Operator {

    private static final Floor INSTANCE = new Floor();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "⌊$1⌋";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) throws IllegalArgumentException {
        OperatorUtils.checkArguments(this, args);
        return args[0].setScale(0, RoundingMode.FLOOR);
    }

    public static Floor operator() {
        return INSTANCE;
    }

    public static Formula floor(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }
}
