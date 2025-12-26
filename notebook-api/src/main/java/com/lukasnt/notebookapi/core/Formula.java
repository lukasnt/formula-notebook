package com.lukasnt.notebookapi.core;

import com.lukasnt.notebookapi.core.operator.Operator;

import java.math.BigDecimal;
import java.util.Arrays;

public class Formula {

    private final Operator operator;
    private final Formula[] inputs;
    private final BigDecimal value;

    public Formula(Operator operator, Formula[] inputs, BigDecimal value) {
        this.operator = operator;
        this.inputs = inputs;
        this.value = value;
    }

    public Formula(Operator operator, Formula[] inputs) {
        this(operator, inputs, null);
    }

    public BigDecimal eval() {
        var arguments = Arrays.stream(inputs)
            .limit(operator.arity())
            .map(Formula::eval)
            .toArray(BigDecimal[]::new);
        return operator.eval(arguments);
    }

    public String text() {
        if (operator.arity() == 0) return operator.notation();
        final String notation = operator.notation();
        var result = new StringBuilder();
        int index = 0;
        for (int i = 0; i < operator.arity(); i++) {
            int next = notation.indexOf("$%d".formatted(i + 1), index);
            result.append(notation, index, next);
            result.append(inputs[i].text());
            index = next + 2;
        }
        result.append(notation.substring(index));
        return result.toString();
    }

    public Operator getOperator() {
        return operator;
    }

    public Formula[] getInputs() {
        return inputs;
    }

    public BigDecimal getValue() {
        return value;
    }
}
