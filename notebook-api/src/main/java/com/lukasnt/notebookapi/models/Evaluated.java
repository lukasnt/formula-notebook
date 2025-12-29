package com.lukasnt.notebookapi.models;

import java.math.BigDecimal;

public record Evaluated(
    BigDecimal num,
    String error
) { }
