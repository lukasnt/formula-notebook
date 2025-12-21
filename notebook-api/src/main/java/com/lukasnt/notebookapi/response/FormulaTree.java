package com.lukasnt.notebookapi.response;

import java.util.List;

public record FormulaTree(
    OperatorID operatorId,
    List<FormulaTree> input,
    Evaluated value
) { }
