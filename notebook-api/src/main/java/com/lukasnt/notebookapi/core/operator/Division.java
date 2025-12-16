package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;

public class Division implements Operator {

    public static final Division INSTANCE = new Division();

    @Override
    public int arity() {
        return 2;
    }

    @Override
    public String notation() {
        return "$1 / $2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].divide(args[1], MathContext.DECIMAL64);
    }

    public static Division operator() {
        return INSTANCE;
    }

    public static Formula division(Formula a, Formula b) {
        return new Formula(operator(), new Formula[]{a, b});
    }

}
