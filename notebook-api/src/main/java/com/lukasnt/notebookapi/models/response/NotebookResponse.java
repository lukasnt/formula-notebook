package com.lukasnt.notebookapi.models.response;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record NotebookResponse(
    UUID notebookId,
    String title,
    ZonedDateTime created,
    List<NotebookCell> cells
) { }
