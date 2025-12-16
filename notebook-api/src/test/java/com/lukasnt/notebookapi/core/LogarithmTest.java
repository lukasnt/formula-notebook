package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Logarithm.logarithm;
import static org.assertj.core.api.Assertions.assertThat;


public class LogarithmTest {

    @Test
    public void testEval() {
        assertThat(logarithm(constant(10)).eval())
            .isGreaterThan(BigDecimal.valueOf(2.3025850929))
            .isLessThan(BigDecimal.valueOf(2.3025850930));
    }

    @Test
    public void testNotation() {
        assertThat(logarithm(constant(10)).text())
            .isEqualTo("ln(10)");
    }

    @Test
    public void testNestedNotation() {
        assertThat(logarithm(logarithm(constant(10))).text())
            .isEqualTo("ln(ln(10))");
    }

}
