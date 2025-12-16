package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;

public class Multiplication implements Operator {

    public static final Multiplication INSTANCE = new Multiplication();

    @Override
    public int arity() {
        return 2;
    }

    @Override
    public String notation() {
        return "$1 * $2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].multiply(args[1], MathContext.DECIMAL64);
    }

    public static Multiplication operator() {
        return INSTANCE;
    }

    public static Formula multiply(Formula a, Formula b) {
        return new Formula(operator(), new Formula[]{a, b});
    }

}
