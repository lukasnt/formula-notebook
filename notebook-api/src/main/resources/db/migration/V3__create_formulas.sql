CREATE TABLE formulas (
    id SERIAL,
    formula_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    cell_id UUID,
    PRIMARY KEY (id, cell_id),
    CONSTRAINT fk_cell_id
        FOREIGN KEY (cell_id)
        REFERENCES cells (cell_id)
        ON DELETE CASCADE,
    operator VARCHAR(32) NOT NULL,
    inputs UUID[] CHECK (cardinality(inputs) <= 5),
    value DECIMAL,
    error VARCHAR(255)
);

ALTER TABLE cells
ADD COLUMN formula UUID,
ADD CONSTRAINT fk_formula_id
    FOREIGN KEY (formula)
    REFERENCES formulas (formula_id)
    ON DELETE NO ACTION;