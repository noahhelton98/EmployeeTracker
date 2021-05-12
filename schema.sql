DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary VARCHAR(30) NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

create TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department_id INT,
    role_id INT,
    manager_id INT, 
    PRIMARY KEY (id)
);