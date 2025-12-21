package com.lukasnt.notebookapi.response;

import java.math.BigDecimal;

public record Evaluated(
    String text,
    BigDecimal num,
    String error
) { }
