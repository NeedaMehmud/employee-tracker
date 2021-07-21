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
                    break;
                case "View Roles":
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
        (err, res) => {
            if (err) throw err
            console.log("before results")
            console.table(res)
            console.log("after results")
        })
}



// function viewDepartment() {
//     console.log("View Department function initialized");
//     connection.query("SELECT * from department", (err, data) => {
//         if (err) throw err;
//         console.table(data);
//         direction();
//     })
// }

function start() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}
