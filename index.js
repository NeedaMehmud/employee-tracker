const mysql = require('mysql');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
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
            'Exit',
            new inquirer.Separator(" "),
            new inquirer.Separator(" "),
        ],

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
                    viewAllEmployees()
                    break;
                case "Add Department":
                    break;
                case "Add Roles":
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "Update Employee's Role":
                    break;
                case "Exit":
                    break;
                default:
                    console.log("You must select an option");
                    break;
            }
        })

}

function viewAllEmployees() {
    console.log("inside view all employees");
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        (err, data) => {
            if (err) throw err
            console.log("before results")
            console.table(data)
            return
        })
}
function viewDepartment() {
    console.log("View Department function initialized");
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        (err, data) => {
            if (err) throw err;
            onsole.log("before results")
            console.table(data);
        })
}
function viewRoles() {
    console.log("View Roles function initialized");
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        (err, data) => {
            if (err) throw err;
            onsole.log("before results")
            console.table(data);
        })
}
let role = [];
function addRole() {
    connection.query("SELECT * FROM role",
        (err, data) => {
            if (err) throw err
            for (let i = 0; i < data.length; i++) {
                role.push(data[i].title);
            }
        })
    return role;
}
let manager = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
        (err, data) => {
            if (err) throw err
            for (let i = 0; i < data.length; i++) {
                manager.push(data[i].first_name);
            }
        })
    return manager;
}
function addEmployees() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: addRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        },
        new inquirer.Separator(" "),
        new inquirer.Separator(" "),
    ]).then(function (data) {
        let roleId = selectRole().indexOf(data.role) + 1
        let managerId = selectManager().indexOf(data.choice) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: data.firstName,
                last_name: data.lastName,
                manager_id: managerId,
                role_id: roleId

            }, (err) => {
                if (err) throw err
                console.table(data)
                direction()
            })
    })
}
function start() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}
