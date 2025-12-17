package com.lukasnt.notebookapi.core;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Optional;

public class Cell {

    private final String notebookId;
    private final String id;
    private ZonedDateTime updated;
    private String name;
    private BigDecimal evaluated;
    private Formula formula;

    public Cell(String notebookId, String id) {
        this.notebookId = notebookId;
        this.id = id;
        this.updated = ZonedDateTime.now();
    }

    public Cell(String notebookId, String id, Formula formula) {
        this(notebookId, id);
        this.formula = formula;
    }

    public BigDecimal evaluate() {
        evaluated = Optional.ofNullable(formula).map(Formula::eval).orElse(BigDecimal.ZERO);
        updated = ZonedDateTime.now();
        return evaluated;
    }

    public void replaceFormula(Formula formula) {
        this.formula = formula;
        updated = ZonedDateTime.now();
        this.evaluated = null;
    }

    public void setName(String name) {
        this.name = name;
        updated = ZonedDateTime.now();
    }

    public String getNotebookId() {
        return notebookId;
    }

    public String getId() {
        return id;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getEvaluated() {
        return evaluated;
    }

    public Formula getFormula() {
        return formula;
    }

}
