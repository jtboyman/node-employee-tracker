INSERT INTO departments (name)
VALUES
('Sales'),
('Finace'),
('HR'),
('Legal'),
('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesperson', 80000.00, 1),
('Sales Manager', 120000.00, 1),
('Account Manager', 100000.00, 2),
('Accountant', 90000.00, 2),
('Recruiter', 50000.00, 3),
('Director', 100000.00, 3),
('Diversity Officer', 65000.00, 3),
('Lawyer', 100000.00, 4),
('Legal Team Lead', 150000.00, 4),
('Software Engineer', 100000.00, 5),
('Lead Engineer', 200000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jim', 'Man', 1, 3),
('Lisa', 'Lady', 1, 3),
('Boss', 'Dude', 2, NULL),
('Joe', 'Schmoe', 3, NULL),
('Miss', 'Maam', 4, 4),
('Mister', 'Sir', 4, 4),
('Nice', 'Guy', 6, NULL),
('Some', 'Fella', 5, 7),
('John', 'Deer', 7, 7),
('Law', 'Abider', 8, 11),
('Master', 'Chief', 9, NULL),
('Pro', 'Grammer', 10, 14),
('Stinky', 'Cheese', 10, 14),
('Lady', 'GaGa', 11, NULL);