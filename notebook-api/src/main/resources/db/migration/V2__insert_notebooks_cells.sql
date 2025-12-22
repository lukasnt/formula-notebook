INSERT INTO notebooks (notebook_id, title, modified)
    VALUES ('083ba821-16f8-42b2-b216-8e5ba6abb8be', 'Assignment 1', current_timestamp),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'Assignment 2 - Problem A', current_timestamp),
           ('dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', 'Assignment 2 - Problem B', current_timestamp),
           ('2095251b-6f83-4404-80c6-2691ff4d0a4d', 'Testing', current_timestamp);

INSERT INTO cells (notebook_id, symbol, updated, text_content, evaluated)
    VALUES ('083ba821-16f8-42b2-b216-8e5ba6abb8be', '1', current_timestamp, 'Assignment 1', 100.0),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.1', current_timestamp, 'Solution to A.1', 2.5),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.2', current_timestamp, 'Solution to A.2', 3.5),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.3', current_timestamp, 'Solution to A.3', 5.5),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', '', current_timestamp, 'Final comments', null),
           ('dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', 'B', current_timestamp, 'Solution to B', 50.0),
           ('dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', '', current_timestamp, 'Additional comments', null),
           ('2095251b-6f83-4404-80c6-2691ff4d0a4d', '', current_timestamp, 'Empty notebook', null)