-- Telling MySQL which db to use
USE employees_db;

-- Populate employee table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Joe", "Smith", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tobias", "Johnson", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dana", "Lee", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tom", "Snyder", 4);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Robert", "Dudly", 5);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Martha", "Stewart", 6);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tim", "Grove", 7);

-- Populate role table
INSERT INTO role (title, salary, department_id)
VALUES ("Helpdesk Rep", 55000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer Team Lead", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 115000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Procurement Manager", 170000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Procurement Specialist", 85000, 4);

-- Populate department table
INSERT INTO department (name)
VALUES ("Helpdesk");
INSERT INTO department (name)
VALUES ("Software Engineering");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Procurement");
