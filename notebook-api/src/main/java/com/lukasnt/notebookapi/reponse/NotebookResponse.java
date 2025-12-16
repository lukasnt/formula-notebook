package com.lukasnt.notebookapi.reponse;

import java.util.List;

public record NotebookResponse(
    String notebookId,
    String title,
    List<Cell> cells
) { }
