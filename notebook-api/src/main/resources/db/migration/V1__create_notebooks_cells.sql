CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    notebook_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP
);

CREATE TABLE cells (
    id SERIAL,
    cell_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    notebook_id UUID,
    PRIMARY KEY (id, notebook_id),
    CONSTRAINT fk_notebook_id
        FOREIGN KEY (notebook_id)
        REFERENCES notebooks (notebook_id)
        ON DELETE CASCADE,
    symbol VARCHAR(32),
    updated TIMESTAMP NOT NULL,
    text_content VARCHAR,
    evaluated DECIMAL
);