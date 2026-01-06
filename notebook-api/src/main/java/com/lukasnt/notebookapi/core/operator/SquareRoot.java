package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;

public class SquareRoot implements Operator {

    public static final SquareRoot INSTANCE = new SquareRoot();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "✓$1";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return args[0].sqrt(MathContext.DECIMAL64);
    }

    public static SquareRoot operator() {
        return INSTANCE;
    }

    public static Formula sqrt(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }

}
