INSERT INTO department (department_name)
VALUES ('Development'),
('Sales'),
('Client Relations'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Lead Developer', 170000, 3),
('Client Manager', 120000, 2),
('Brand Manager', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Morgan', 'Rott', 1, 2),
('Jon', 'Brown', 3, NULL),
('Jill', 'Jack', 2, 1),
('Sonny', 'Burnette', 4, NULL);