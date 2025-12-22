package com.lukasnt.notebookapi.core;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

public class Cell {

    private final UUID notebookId;
    private final UUID id;
    private ZonedDateTime updated;
    private String symbol;
    private String textContent;
    private BigDecimal evaluated;
    private Formula formula;

    public Cell(UUID notebookId, UUID id) {
        this.notebookId = notebookId;
        this.id = id;
        this.updated = ZonedDateTime.now();
    }

    public Cell(UUID notebookId, UUID id, String symbol, Formula formula, String textContent, BigDecimal evaluated) {
        this(notebookId, id);
        this.symbol = symbol;
        this.formula = formula;
        this.textContent = textContent;
        this.evaluated = evaluated;
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

    public void setSymbol(String symbol) {
        this.symbol = symbol;
        updated = ZonedDateTime.now();
    }

    public UUID getNotebookId() {
        return notebookId;
    }

    public UUID getId() {
        return id;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getTextContent() {
        return textContent;
    }

    public BigDecimal getEvaluated() {
        return evaluated;
    }

    public Formula getFormula() {
        return formula;
    }

}
