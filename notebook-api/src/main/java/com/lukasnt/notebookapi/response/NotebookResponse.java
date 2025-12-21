package com.lukasnt.notebookapi.response;

import java.time.ZonedDateTime;
import java.util.List;

public record NotebookResponse(
    String notebookId,
    String title,
    ZonedDateTime created,
    List<NotebookCell> cells
) { }
