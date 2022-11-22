SELECT employee_id, name, role_id, title, salary, first_name, last_name, manager_id
FROM ((departments JOIN roles ON departments.id = roles.department_id) JOIN employees ON roles.id = employees.role_id);