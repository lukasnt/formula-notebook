package com.lukasnt.notebookapi.core;


import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.lukasnt.notebookapi.core.operator.Absolute.absolute;
import static com.lukasnt.notebookapi.core.operator.Constant.constant;
import static org.assertj.core.api.Assertions.assertThat;


public class AbsoluteTest {

    @Test
    public void testEval() {
        assertThat(absolute(constant(BigDecimal.valueOf(-10.50))).eval())
            .isEqualTo(BigDecimal.valueOf(10.50));
        assertThat(absolute(constant(BigDecimal.valueOf(10.50))).eval())
            .isEqualTo(BigDecimal.valueOf(10.50));
        assertThat(absolute(constant(BigDecimal.ZERO)).eval())
            .isEqualTo(BigDecimal.ZERO);
    }

}
