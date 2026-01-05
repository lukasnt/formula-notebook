package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Euler implements Operator {

    public static final Euler INSTANCE = new Euler();

    @Override
    public int arity() {
        return 0;
    }

    @Override
    public String notation() {
        return "e";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return BigDecimal.valueOf(Math.E);
    }

    public static Euler operator() {
        return INSTANCE;
    }

    public static Formula euler() {
        return new Formula(new Euler(), new Formula[]{});
    }
}
