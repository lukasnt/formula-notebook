package com.lukasnt.notebookapi.response;

import java.math.BigDecimal;

public record Evaluated(
    BigDecimal num,
    String error
) { }
