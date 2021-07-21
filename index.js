const mysql = require('mysql');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

//================ Connect to the Database =================== //
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'employee_managementDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
//================== Initial Prompt =======================//
function direction() {
    inquirer.prompt({
        name: 'direction',
        type: 'list',
        message: 'Welcome to Employee Management! What would you like to do?',
        choices: [
            'View Department',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Roles',
            'Add Employees',
            "Update Employee's Role",
            'Exit'],
        transformer: function (blue) {
            return chalkPipe(blue)(blue);
        }
    })
        .then((data) => {
            console.log(data.direction);
            switch (data.direction) {
                case "View Department":
                    viewDepartment()
                    break;
                case "View Roles":
                    viewRoles()
                    break;
                case "View Employees":
                    break;
                case "Add Department":
                    break;
                case "Add Roles":
                    break;
                case "Add Employees":
                    AddEmployees();
                    break;
                case "Update Employee's Role":
                    break;
                case "Exit":
                    break;
                default:
                    console.log("You must select something");
                    break;

            }
        })

}

//============= Add Employees ==========================//
function AddEmployees() {
    console.log("inside add employees");
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        (err, data) => {
            if (err) throw err
            console.log("before results")
            console.table(data)
        })
}


//============= View Departments ==========================//
function viewDepartment() {
    console.log("View Department function initialized");
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        (err, data) => {
            if (err) throw err;
            console.table(data);
            // direction();
        })
}

//============= View All Roles ==========================//
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, data) => {
            if (err) throw err;
            console.table(data);
            // direction();
        })
}

function start() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}
