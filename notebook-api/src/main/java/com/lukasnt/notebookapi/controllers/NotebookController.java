package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.core.NotebookManager;
import com.lukasnt.notebookapi.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notebooks")
public class NotebookController {

    @Autowired
    NotebookManager notebookManager;

    @GetMapping()
    public NotebookResponse test() {
        return new NotebookResponse("1", "Test", ZonedDateTime.now(), List.of(
            new NotebookCell("1", "1", "a", ZonedDateTime.now(),
                new FormulaTree(OperatorID.PLUS, List.of(
                    new FormulaTree(OperatorID.CONSTANT, null, new Evaluated(null, BigDecimal.ONE, null)),
                    new FormulaTree(OperatorID.CONSTANT, null, new Evaluated(null, BigDecimal.ONE, null))
                ), new Evaluated(null, BigDecimal.TWO, null)),
                new Evaluated(null, BigDecimal.TWO, null)
        )));
    }

    @GetMapping("/{id}")
    public NotebookResponse getNotebook(@PathVariable String id) {
        return ResponseMapper.mapNotebook(notebookManager.getStoredNotebook(id));
    }

    @GetMapping("/{id}/cell/{cellId}")
    public NotebookCell evaluateCell(@PathVariable String id, @PathVariable String cellId) {
        return ResponseMapper.mapCell(notebookManager.getStoredNotebook(id).evaluateCell(cellId));
    }

    @PostMapping("/{id}/cell")
    public NotebookCell createCell(@PathVariable String id) {
        return ResponseMapper.mapCell(notebookManager.getStoredNotebook(id).createCell());
    }

    @DeleteMapping("/{id}/cell/{cellId}")
    public NotebookCell deleteCell(@PathVariable String id, @PathVariable String cellId) {
        return ResponseMapper.mapCell(notebookManager.getStoredNotebook(id).deleteCell(cellId));
    }

    @PutMapping("/{id}/cell/{cellId}")
    public NotebookCell replaceCellFormula(@PathVariable String id, @PathVariable String cellId, @RequestBody FormulaTree formula) {
        var cell = notebookManager.getStoredNotebook(id)
            .replaceCellFormula(cellId, RequestMapper.mapFormulaTree(formula));
        return ResponseMapper.mapCell(cell);
    }

}
