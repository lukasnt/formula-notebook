package com.lukasnt.notebookapi.reponse;

public record Cell(
    String notebookId,
    String cellId,
    String name,
    FormulaTree formula,
    Evaluated evaluated
) { }
