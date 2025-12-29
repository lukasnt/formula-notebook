package com.lukasnt.notebookapi.database;

import java.time.ZonedDateTime;
import java.util.UUID;

public record NotebookEntry(
    Integer id,
    UUID notebookId,
    String title,
    ZonedDateTime created,
    ZonedDateTime modified
) {
}
