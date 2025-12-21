package com.lukasnt.notebookapi.data;

import java.time.ZonedDateTime;

public record NotebookEntry(
    String notebookId,
    String title,
    ZonedDateTime created,
    ZonedDateTime modified
) {
}
