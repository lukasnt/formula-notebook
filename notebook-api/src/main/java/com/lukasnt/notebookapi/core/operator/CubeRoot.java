package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;

public class CubeRoot implements Operator {

    public static final CubeRoot INSTANCE = new CubeRoot();

    @Override
    public int arity() {
        return 1;
    }

    @Override
    public String notation() {
        return "∛$1";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return BigDecimal.valueOf(Math.pow(args[0].doubleValue(), (double) 1 / 3));
    }

    public static CubeRoot operator() {
        return INSTANCE;
    }

    public static Formula cubeRoot(Formula a) {
        return new Formula(operator(), new Formula[]{a});
    }

}
