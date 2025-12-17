package com.lukasnt.notebookapi.reponse;

import java.time.ZonedDateTime;

public record NotebookCell(
    String notebookId,
    String cellId,
    String name,
    ZonedDateTime updated,
    FormulaTree formula,
    Evaluated evaluated
) { }
