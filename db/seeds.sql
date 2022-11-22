INSERT INTO departments (department_name)
VALUES ('Engineering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 76000, 2), ('Staff Accountant', 90000, 2), ('Corporate Counsel', 110000, 3), ('Senior Corporate Counsel', 150000, 3), ('Associate Engineer', 96000, 1), ('Senior Engineer', 126000, 1), ('Sales Associate', 56000, 4), ('Senior Sales Associate', 72000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, 1), ('Amy', 'Wilson', 2, NULL), ('Saul', 'Goodman', 3, 2), ('Atticus', 'Finch', 4, NULL), ('Tim', 'Wardlow', 5, 3), ('Michael', 'Widenius', 6, NULL), ('Dwight', 'Schrute', 7, 4), ('Jim', 'Halpert', 8, NULL);

