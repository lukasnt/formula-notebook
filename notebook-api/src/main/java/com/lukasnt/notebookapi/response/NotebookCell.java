package com.lukasnt.notebookapi.response;

import java.time.ZonedDateTime;
import java.util.UUID;

public record NotebookCell(
    UUID notebookId,
    UUID cellId,
    String symbol,
    ZonedDateTime updated,
    FormulaTree formula,
    String textContent,
    Evaluated evaluated
) { }
