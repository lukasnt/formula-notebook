package com.lukasnt.notebookapi.models;

import java.util.List;

public record FormulaTree(
    String id,
    OperatorID operator,
    List<FormulaTree> inputs,
    Evaluated value
) { }
