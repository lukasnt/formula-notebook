package com.lukasnt.notebookapi.data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public record CellEntry(
    Integer id,
    UUID cellId,
    UUID notebookId,
    String symbol,
    ZonedDateTime updated,
    String textContent,
    BigDecimal evaluated
) {
}
