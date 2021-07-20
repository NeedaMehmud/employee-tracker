--CREATING DATABASE --
DROP DATABASE IF EXISTS employee_managementDB;

CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10, 2)NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES  role (id),
FOREIGN KEY (manager_id) REFERENCES employee (id)

);

INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Billing");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Information Technology");
INSERT INTO department (name)
VALUE ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("CEO", 600000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Tech Analyst", 95000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Human Resources Manager", 190000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Amina", "Abdul", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Neda", "Mohammed", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lia","Isaaf",1,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Laila", "Sadiq", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Aisha", "Khalid", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kai", "Murtaza", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Nayla", "Faris", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

