package com.lukasnt.notebookapi.core.operator;

import com.lukasnt.notebookapi.core.Formula;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

public class GoldenRatio implements Operator {

    public static final GoldenRatio INSTANCE = new GoldenRatio();

    @Override
    public int arity() {
        return 0;
    }

    @Override
    public String notation() {
        return "φ";
    }

    @Override
    public BigDecimal eval(BigDecimal[] args) {
        OperatorUtils.checkArguments(this, args);
        return BigDecimal.ONE
            .add(BigDecimal.valueOf(5).sqrt(MathContext.DECIMAL64))
            .divide(BigDecimal.TWO, RoundingMode.HALF_UP);
    }

    public static GoldenRatio operator() {
        return INSTANCE;
    }

    public static Formula goldenRatio() {
        return new Formula(new GoldenRatio(), new Formula[]{});
    }
}
