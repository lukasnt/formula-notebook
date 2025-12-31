package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.NotebookService;
import com.lukasnt.notebookapi.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notebooks")
public class NotebookController {

    @Autowired
    NotebookService notebookService;

    @GetMapping("/test")
    public NotebookData test() {
        return new NotebookData(UUID.randomUUID(), "Test", ZonedDateTime.now(), ZonedDateTime.now(), 1, List.of(
            new NotebookCell(UUID.randomUUID(), UUID.randomUUID(), "a", ZonedDateTime.now(),
                new FormulaTree("1", OperatorID.PLUS, List.of(
                    new FormulaTree("2", OperatorID.CONSTANT, null, new Evaluated(BigDecimal.ONE, null)),
                    new FormulaTree("3", OperatorID.CONSTANT, null, new Evaluated(BigDecimal.ONE, null))
                ), new Evaluated(BigDecimal.TWO, null)),
                "Text",
                new Evaluated(BigDecimal.TWO, null)
        )));
    }

    @GetMapping()
    public List<NotebookData> getAllNotebooks() {
        return notebookService.getAllNotebooks().stream().map(ResponseMapper::mapNotebook).toList();
    }

    @GetMapping("/{id}")
    public NotebookData getNotebook(@PathVariable String id) {
        return ResponseMapper.mapNotebook(notebookService.getNotebook(id));
    }

    @PutMapping("/{id}")
    public NotebookData saveNotebook(@PathVariable String id, @RequestBody NotebookData notebook) {
        IO.println(notebook);
        return notebookService.saveNotebook(notebook);
    }

    @PostMapping("/{id}/cell")
    public NotebookCell createCell(@PathVariable String id) {
        return notebookService.createCell(id);
    }

    @DeleteMapping("/{id}/cell/{cellId}")
    public NotebookCell deleteCell(@PathVariable String id, @PathVariable String cellId) {
        return notebookService.deleteCell(id, cellId);
    }

    @PutMapping("/{id}/cell/{cellId}")
    public NotebookCell replaceEvaluateCell(@PathVariable String id, @PathVariable String cellId, @RequestBody NotebookCell cell) {
        return notebookService.replaceEvaluateCell(id, cell);
    }

}
