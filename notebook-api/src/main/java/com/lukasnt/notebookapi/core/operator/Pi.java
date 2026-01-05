package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Pi implements Operator {

    public static final Pi INSTANCE = new Pi();

    @Override
    public int arity() {
        return 0;
    }

    @Override
    public String notation() {
        return "π";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return BigDecimal.valueOf(Math.PI);
    }

    public static Pi operator() {
        return INSTANCE;
    }

    public static Formula pi() {
        return new Formula(new Pi(), new Formula[]{});
    }
}
