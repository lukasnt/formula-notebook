package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Ceil.ceil;
import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static com.lukasnt.notebookapi.core.operator.Floor.floor;
import static org.assertj.core.api.Assertions.assertThat;


public class CeilTest {

    @Test
    public void testEval() {
        assertThat(ceil(constant(BigDecimal.valueOf(10.50))).eval())
            .isEqualTo(BigDecimal.valueOf(11));
        assertThat(ceil(constant(BigDecimal.valueOf(10.99))).eval())
            .isEqualTo(BigDecimal.valueOf(11));
        assertThat(ceil(constant(BigDecimal.valueOf(9.99))).eval())
            .isEqualTo(BigDecimal.TEN);
    }

}
