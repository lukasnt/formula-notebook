package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.NotebookService;
import com.lukasnt.notebookapi.models.OperatorID;
import com.lukasnt.notebookapi.models.Evaluated;
import com.lukasnt.notebookapi.models.FormulaTree;
import com.lukasnt.notebookapi.models.NotebookCell;
import com.lukasnt.notebookapi.models.response.NotebookResponse;
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
    public NotebookResponse test() {
        return new NotebookResponse(UUID.randomUUID(), "Test", ZonedDateTime.now(), List.of(
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
    public List<NotebookResponse> getAllNotebooks() {
        return notebookService.getAllNotebooks().stream().map(ResponseMapper::mapNotebook).toList();
    }

    @GetMapping("/{id}")
    public NotebookResponse getNotebook(@PathVariable String id) {
        return ResponseMapper.mapNotebook(notebookService.getNotebook(id));
    }

    @PutMapping("/{id}")
    public NotebookResponse saveNotebook(@PathVariable String id, @RequestBody String notebook) {
        IO.println(notebook);
        return ResponseMapper.mapNotebook(notebookService.getNotebook(id));
    }

    @GetMapping("/{id}/cell/{cellId}")
    public NotebookCell evaluateCell(@PathVariable String id, @PathVariable String cellId) {
        return ResponseMapper.mapCell(notebookService.getNotebook(id).evaluateCell(cellId));
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
    public NotebookCell replaceCellFormula(@PathVariable String id, @PathVariable String cellId, @RequestBody FormulaTree formula) {
        var cell = notebookService.getNotebook(id)
            .replaceCellFormula(cellId, RequestMapper.mapFormulaTree(formula));
        return ResponseMapper.mapCell(cell);
    }

}
