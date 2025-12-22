package com.lukasnt.notebookapi.data;

import java.time.ZonedDateTime;

public record NotebookEntry(
    Integer id,
    String notebookId,
    String title,
    ZonedDateTime created,
    ZonedDateTime modified
) {
}
