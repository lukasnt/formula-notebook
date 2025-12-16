package com.lukasnt.notebookapi.controllers;

import com.lukasnt.notebookapi.reponse.OperatorInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/operators")
public class OperatorController {

    @GetMapping()
    public List<OperatorInfo> getOperators() {
        return OperatorInfo.operators();
    }

}
