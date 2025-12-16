package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Division.division;
import static com.lukasnt.notebookapi.core.operator.Multiplication.multiply;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class MultiplicationTest {

    @Test
    public void testEval() {
        assertThat(multiply(constant(10), constant(20)).eval())
            .isEqualTo(BigDecimal.valueOf(200));
    }

    @Test
    public void testNestedEval() {
        assertThat(multiply(
            multiply(constant(10), constant(20)),
            multiply(constant(10), constant(20))
        ).eval())
            .isEqualTo(BigDecimal.valueOf(40_000));
    }

    @Test
    public void testNotation() {
        assertThat(multiply(constant(10), constant(20)).text())
            .isEqualTo("10 * 20");
    }

}
