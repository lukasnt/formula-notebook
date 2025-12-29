package com.lukasnt.notebookapi.models;

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
