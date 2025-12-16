package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.reponse.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/notebooks")
public class NotebookController {

    @GetMapping("/{id}")
    public NotebookResponse test(@PathVariable String id) {
        return new NotebookResponse("1", "Test", List.of(
            new Cell("1", "1", "a",
                new FormulaTree(OperatorID.PLUS, List.of(
                    new FormulaTree(OperatorID.CONSTANT, null, new Evaluated(null, BigDecimal.ONE, null)),
                    new FormulaTree(OperatorID.CONSTANT, null, new Evaluated(null, BigDecimal.ONE, null))
                ), new Evaluated(null, BigDecimal.TWO, null)),
            new Evaluated(null, BigDecimal.TWO, null))
        ));
    }

}
