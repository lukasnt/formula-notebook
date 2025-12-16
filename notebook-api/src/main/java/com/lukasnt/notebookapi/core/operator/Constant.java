package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Constant implements Operator {

    private final BigDecimal value;

    public Constant(BigDecimal value) {
        this.value = value;
    }

    @Override
    public int arity() {
        return 0;
    }

    @Override
    public String notation() {
        return String.valueOf(value);
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return value;
    }

    public static Formula constant(BigDecimal value) {
        return new Formula(new Constant(value), new Formula[]{});
    }

    public static Formula constant(int value) {
        return new Formula(new Constant(BigDecimal.valueOf(value)), new Formula[]{});
    }

}
