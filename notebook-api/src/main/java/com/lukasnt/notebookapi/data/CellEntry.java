package com.lukasnt.notebookapi.data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public record CellEntry(
    Integer id,
    String cellId,
    String notebookId,
    String symbol,
    ZonedDateTime updated,
    String textContent,
    BigDecimal evaluated
) {
}
