package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Minus.minus;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class MinusTest {

    @Test
    public void testEval() {
        assertThat(minus(constant(20), constant(10)).eval())
            .isEqualTo(BigDecimal.valueOf(10));
    }

    @Test
    public void testNestedEval() {
        assertThat(minus(
            minus(constant(20), constant(10)),
            minus(constant(20), constant(10))
        ).eval())
            .isEqualTo(BigDecimal.valueOf(0));
    }

    @Test
    public void testNotation() {
        assertThat(minus(constant(10), constant(20)).text())
            .isEqualTo("10 - 20");
    }

}
