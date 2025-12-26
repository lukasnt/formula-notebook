package com.lukasnt.notebookapi.data;

import java.math.BigDecimal;
import java.util.UUID;

public record FormulaEntry(
    Integer id,
    UUID formulaId,
    UUID cellId,
    String operator,
    UUID[] inputs,
    BigDecimal value,
    String error
) { }
