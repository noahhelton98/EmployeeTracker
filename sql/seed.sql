INSERT INTO employees_db.departments (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');


INSERT INTO employees_db.role (title, salary, department_id)
VALUES
  ('Sales Lead', 60000 , 1),
  ('Salesperson', 50000 , 1),
  ('Lead Engineer', 100000, 2),
  ('Software Enginner', 80000, 2),
  ('Accountant', 100000, 3),
  ('Legal Team Lead', 125000, 4),
  ('Lawyer', 100000, 4);


INSERT INTO employees_db.employees (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, 3),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Malia', 'Brown', 5, NULL),
('Sarah', 'Lourd', 6, NULL),
('Tom', 'Allen', 7, 7),
('Tammer', 'Galal', 4, 6)
