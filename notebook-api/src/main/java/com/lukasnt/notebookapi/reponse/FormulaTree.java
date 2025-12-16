package com.lukasnt.notebookapi.reponse;

import java.util.List;

public record FormulaTree(
    OperatorID operatorId,
    List<FormulaTree> input,
    Evaluated value
) { }
