package com.lukasnt.notebookapi.core.operator;

import java.math.BigDecimal;

public interface Operator {

    int arity();
    String notation();
    BigDecimal eval(BigDecimal[] args);

}
