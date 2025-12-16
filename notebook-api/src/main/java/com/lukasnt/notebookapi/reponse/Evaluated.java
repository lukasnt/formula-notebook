package com.lukasnt.notebookapi.reponse;

import java.math.BigDecimal;

public record Evaluated(
    String text,
    BigDecimal num,
    String error
) { }
