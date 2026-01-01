package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;

public class Squared implements Operator {

    public static final Squared INSTANCE = new Squared();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "$1^2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].multiply(args[0]);
    }

    public static Squared operator() {
        return INSTANCE;
    }

    public static Formula squared(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }

}
