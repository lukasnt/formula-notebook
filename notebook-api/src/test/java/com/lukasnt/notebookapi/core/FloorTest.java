package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Floor.floor;
import static com.lukasnt.notebookapi.core.operator.Logarithm.logarithm;
import static org.assertj.core.api.Assertions.assertThat;


public class FloorTest {

    @Test
    public void testEval() {
        assertThat(floor(constant(BigDecimal.valueOf(10.50))).eval())
            .isEqualTo(BigDecimal.TEN);
        assertThat(floor(constant(BigDecimal.valueOf(10.99))).eval())
            .isEqualTo(BigDecimal.TEN);
        assertThat(floor(constant(BigDecimal.valueOf(9.99))).eval())
            .isEqualTo(BigDecimal.valueOf(9));
    }

}
