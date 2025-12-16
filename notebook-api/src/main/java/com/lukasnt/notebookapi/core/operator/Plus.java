package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Plus implements Operator {

    private static final Plus INSTANCE = new Plus();

    @Override
    public int arity() {
        return 2;
    }

    @Override
    public String notation() {
        return "$1 + $2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].add(args[1]);
    }

    public static Plus operator() {
        return INSTANCE;
    }

    public static Formula plus(Formula a, Formula b) {
        return new Formula(operator(), new Formula[]{a, b});
    }

}
