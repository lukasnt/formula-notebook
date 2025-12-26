
INSERT INTO formulas (formula_id, cell_id, operator, inputs, value, error)
VALUES ('7bb93ce4-bbbd-4d24-9a57-00fddac638a0', '05b55727-c64e-4fc2-8de6-04beb1e64d0c',
        'CONSTANT', ARRAY[]::UUID[], 50, null),
       ('021896a3-683a-4c82-93e3-3b69ae9f43de', '05b55727-c64e-4fc2-8de6-04beb1e64d0c',
        'CONSTANT', ARRAY[]::UUID[], 20, null),
       ('90ed3810-9e2a-4e71-947d-b60fdb509d56', '05b55727-c64e-4fc2-8de6-04beb1e64d0c',
        'PLUS', ARRAY['7bb93ce4-bbbd-4d24-9a57-00fddac638a0', '021896a3-683a-4c82-93e3-3b69ae9f43de']::UUID[], null, null),
       ('85bf87c2-492d-468e-8f30-7d5e1cd356ba', '11ae437d-8783-4865-96fd-b25e3b440968',
        'CONSTANT', ARRAY[]::UUID[], 100, null),
       ('d0f9461e-7bcb-4344-a61d-c65106eafea7', '11ae437d-8783-4865-96fd-b25e3b440968',
        'CONSTANT', ARRAY[]::UUID[], 5, null),
       ('abfd537f-78c2-438e-b613-187ef3bdadd3', '11ae437d-8783-4865-96fd-b25e3b440968',
        'PLUS', ARRAY['85bf87c2-492d-468e-8f30-7d5e1cd356ba', 'd0f9461e-7bcb-4344-a61d-c65106eafea7']::UUID[], null, null),
       ('518ea6d5-cec1-41a8-a984-bca827437760', '11ae437d-8783-4865-96fd-b25e3b440968',
        'CONSTANT', ARRAY[]::UUID[], 4, null),
       ('c83ab096-1867-4334-b044-ed8b04e3f658', '11ae437d-8783-4865-96fd-b25e3b440968',
        'DIVISION', ARRAY['abfd537f-78c2-438e-b613-187ef3bdadd3', '518ea6d5-cec1-41a8-a984-bca827437760']::UUID[], null, null),
       ('225faeaf-21cb-4fd3-aa7e-adabc00837f1', '50bc4ec6-e256-4c8c-a1f3-071e70c35390',
        'CONSTANT', ARRAY[]::UUID[], 20, 50.0),
       ('39e84590-709e-4233-aa07-f8cdf2896ec6', '50bc4ec6-e256-4c8c-a1f3-071e70c35390',
        'CONSTANT', ARRAY[]::UUID[], 15, null),
       ('0d67927a-c8a4-4f9b-9f26-3fd7899a7f4a', '50bc4ec6-e256-4c8c-a1f3-071e70c35390',
        'MINUS', ARRAY['225faeaf-21cb-4fd3-aa7e-adabc00837f1', '39e84590-709e-4233-aa07-f8cdf2896ec6']::UUID[], null, null),
       ('252034d8-664d-45f1-b4fb-5d32a8af8069', 'ebeeca38-5582-4a1c-b6c9-df6a7a717158',
        'CONSTANT', ARRAY[]::UUID[], 200, null);

UPDATE cells SET formula = '90ed3810-9e2a-4e71-947d-b60fdb509d56' WHERE cell_id = '05b55727-c64e-4fc2-8de6-04beb1e64d0c';
UPDATE cells SET formula = 'c83ab096-1867-4334-b044-ed8b04e3f658' WHERE cell_id = '11ae437d-8783-4865-96fd-b25e3b440968';
UPDATE cells SET formula = '0d67927a-c8a4-4f9b-9f26-3fd7899a7f4a' WHERE cell_id = '50bc4ec6-e256-4c8c-a1f3-071e70c35390';
UPDATE cells SET formula = '252034d8-664d-45f1-b4fb-5d32a8af8069' WHERE cell_id = 'ebeeca38-5582-4a1c-b6c9-df6a7a717158';
