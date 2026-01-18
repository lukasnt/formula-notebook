package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Empty implements Operator {

    public static final Empty INSTANCE = new Empty();

    @Override
    public int arity() {
        return 0;
    }

    @Override
    public String notation() {
        return "";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        throw new IllegalArgumentException("Empty operator cannot be evaluated");
    }

    public static Empty operator() {
        return INSTANCE;
    }

    public static Formula empty() {
        return new Formula(operator(), new Formula[]{});
    }

}
