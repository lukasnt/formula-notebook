package com.lukasnt.notebookapi.models;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record NotebookData(
    UUID notebookId,
    String title,
    ZonedDateTime created,
    ZonedDateTime modified,
    Integer cellCount,
    List<NotebookCell> cells
) { }
