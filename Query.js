const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'employee_managementDB',
});

class Queries {
    
    viewDepartment() {
        console.log("View Department function initialized");
        connection.query(
            `SELECT employee.first_name, 
        employee.last_name, department.name 
        AS Department FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employee.id;`,
            (err, data) => {
                if (err) throw err;
                console.table(data);
                connection.end();
            });
    }

    viewRoles() {
        connection.query(
            `SELECT employee.first_name, 
        employee.last_name, 
        role.title 
        AS Title FROM employee 
        JOIN role ON employee.role_id = role.id;`,
            (err, data) => {
                if (err) throw err;
                console.table(data);
                connection.end();
            });
    }

    viewEmployees() {
        console.log("inside view all employees");
        connection.query(
            `SELECT employee.first_name, 
        employee.last_name, 
        role.title, role.salary, 
        department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
        AS Manager FROM employee 
        INNER JOIN role on role.id = employee.role_id 
        INNER JOIN department on department.id = role.department_id 
        left join employee e on employee.manager_id = e.id;`,
            (err, data) => {
                if (err) throw err
                console.table(data)
                connection.end();
            });
    }

    selectAllRoles() {
        let role = [];
        connection.query("SELECT * FROM role",
            (err, data) => {
                if (err) throw err;
                for (let i = 0; i < data.length; i++) {
                    role.push(data[i].title);
                }
            });
        return role;
    }

    selectManager() {
        let manager = [];
        connection.query(
            `SELECT first_name, 
        last_name FROM employee 
        WHERE manager_id IS NULL`,
            (err, data) => {
                if (err) throw err
                for (let i = 0; i < data.length; i++) {
                    manager.push(data[i].first_name);
                }
            });
        return manager;
    }
}

module.exports = Queries;


