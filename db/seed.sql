CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 85000, 1), ("Senior Engineer", 125000, 1), ("CEO", 350000, 3), ("Attorney", 300000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Laila', 'Bashir', 1, 2), ('Kai', 'Lori', 1, null), ('Mia', 'Bilkees', 1, 2), ('Ahmed', 'Khan', 2, 2), ('Lia', 'Kumar', 4, null);

