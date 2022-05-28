DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE employee (
    id INT (10),
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT (10),
    manager_id INT (10)
);

CREATE TABLE role (
    ID_PK INT (10),
    title VARCHAR (30),
    salary DECIMAL (10),
    department_id INT (10)
);

CREATE TABLE department (
    ID_PK INT (10),
    name VARCHAR (50)
);
