package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Division.division;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class DivisionTest {

    @Test
    public void testEval() {
        assertThat(division(constant(10), constant(20)).eval())
            .isEqualTo(BigDecimal.valueOf(0.5));
    }

    @Test
    public void testNestedEval() {
        assertThat(division(
            division(constant(10), constant(20)),
            division(constant(10), constant(20))
        ).eval())
            .isEqualTo(BigDecimal.valueOf(1));
    }

    @Test
    public void testNotation() {
        assertThat(division(constant(10), constant(20)).text())
            .isEqualTo("10 / 20");
    }

}
