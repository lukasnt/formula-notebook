INSERT INTO notebooks (notebook_id, title, modified)
    VALUES ('083ba821-16f8-42b2-b216-8e5ba6abb8be', 'Assignment 1', current_timestamp),
           ('335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'Assignment 2 - Problem A', current_timestamp),
           ('dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', 'Assignment 2 - Problem B', current_timestamp),
           ('2095251b-6f83-4404-80c6-2691ff4d0a4d', 'Testing', current_timestamp);

INSERT INTO cells (cell_id, notebook_id, symbol, updated, text_content, evaluated)
    VALUES ('05b55727-c64e-4fc2-8de6-04beb1e64d0c', '083ba821-16f8-42b2-b216-8e5ba6abb8be', '1', current_timestamp, 'Assignment 1', 100.0),
           ('11ae437d-8783-4865-96fd-b25e3b440968', '335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.1', current_timestamp, 'Solution to A.1', 2.5),
           ('50bc4ec6-e256-4c8c-a1f3-071e70c35390', '335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.2', current_timestamp, 'Solution to A.2', 3.5),
           ('ebeeca38-5582-4a1c-b6c9-df6a7a717158', '335dd499-2c1c-4a51-bb1e-cf933d3761aa', 'A.3', current_timestamp, 'Solution to A.3', 5.5),
           ('cce506a0-a6a3-41ec-a8cf-b71b5556e393', '335dd499-2c1c-4a51-bb1e-cf933d3761aa', '', current_timestamp, 'Final comments', null),
           ('a31ba572-67c1-40ce-baf9-784c32903e37', 'dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', 'B', current_timestamp, 'Solution to B', 50.0),
           ('cf648865-3337-4359-81a3-447b644dce91', 'dba139ce-fa15-4f5b-9d3f-adbfa91ddc79', '', current_timestamp, 'Additional comments', null),
           ('9dee60ac-b83c-45f1-a1c0-19414cfb0193', '2095251b-6f83-4404-80c6-2691ff4d0a4d', '', current_timestamp, 'Empty notebook', null)