DROP DATABASE IF EXISTS employee_managementDB;

CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Administration");

INSERT INTO department (name)
VALUES ("Instruction");

INSERT INTO department (name)
VALUES ("Cafeteria");

