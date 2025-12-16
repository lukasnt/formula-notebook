package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Plus.plus;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class PlusTest {

    @Test
    public void testEval() {
        assertThat(plus(constant(10), constant(20)).eval())
            .isEqualTo(BigDecimal.valueOf(30));
    }

    @Test
    public void testNestedEval() {
        assertThat(plus(
            plus(constant(10), constant(20)),
            plus(constant(10), constant(20))
        ).eval())
            .isEqualTo(BigDecimal.valueOf(60));
    }

    @Test
    public void testNotation() {
        assertThat(plus(constant(10), constant(20)).text())
            .isEqualTo("10 + 20");
    }

    @Test
    public void testNestedNotation() {
        assertThat(plus(
            plus(constant(10), constant(20)),
            plus(constant(10), constant(20))
        ).text())
            .isEqualTo("10 + 20 + 10 + 20");
    }

}
