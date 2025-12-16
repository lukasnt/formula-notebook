package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Minus implements Operator {

    public static final Minus INSTANCE = new Minus();

    @Override
    public int arity() {
        return 2;
    }

    @Override
    public String notation() {
        return "$1 - $2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].subtract(args[1]);
    }

    public static Minus operator() {
        return INSTANCE;
    }

    public static Formula minus(Formula a, Formula b) {
        return new Formula(operator(), new Formula[]{a, b});
    }


}
