CREATE TABLE notebooks (
    notebook_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP
);

CREATE TABLE cells (
    cell_id SERIAL,
    notebook_id INTEGER,
    PRIMARY KEY (cell_id, notebook_id),
    CONSTRAINT fk_notebook_id
        FOREIGN KEY (notebook_id)
        REFERENCES notebooks (notebook_id)
        ON DELETE CASCADE,
    symbol VARCHAR(32),
    updated TIMESTAMP NOT NULL,
    text_content VARCHAR,
    evaluated DECIMAL
);