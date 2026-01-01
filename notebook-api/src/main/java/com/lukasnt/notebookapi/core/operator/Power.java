package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;

public class Power implements Operator {

    public static final Power INSTANCE = new Power();

    @Override
    public int arity() {
        return 2;
    }

    @Override
    public String notation() {
        return "$1^$2";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].pow(args[1].intValue());
    }

    public static Power operator() {
        return INSTANCE;
    }

    public static Formula power(Formula a, Formula b) {
        return new Formula(operator(), new Formula[]{a, b});
    }

}
