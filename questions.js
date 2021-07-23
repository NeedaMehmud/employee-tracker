const mysql = require('mysql');
const inquirer = require('inquirer');
const Queries = require('./Query')
const chalkPipe = require('chalk-pipe');

const query = new Queries();

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
                    query.viewDepartment();
                    break;
                case "View Roles":
                    query.viewRoles()
                    break;
                case "View Employees":
                    query.viewEmployees()
                    break;
                case "Add Department":
                    break;
                case "Add Roles":
                    break;
                case "Add Employees":
                    query.addEmployees()
                    break;
                case "Update Employee's Role":
                    query.updateEmployee()
                    break;
                case "Exit":
                    break;
                default:
                    console.log("You must select an option");
                    break;
            }
        });
}

// function viewAllEmployees() {
//     console.log("inside view all employees");
//     connection.query(
//         `SELECT employee.first_name, 
//     employee.last_name, 
//     role.title, role.salary, 
//     department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
//     AS Manager FROM employee 
//     INNER JOIN role on role.id = employee.role_id 
//     INNER JOIN department on department.id = role.department_id 
//     left join employee e on employee.manager_id = e.id;`,
//         (err, data) => {
//             if (err) throw err
//             console.table(data)
//         });
// }

// function viewDepartment() {
//     console.log("View Department function initialized");
//     connection.query(
//         `SELECT employee.first_name, 
//     employee.last_name, department.name 
//     AS Department FROM employee 
//     JOIN role ON employee.role_id = role.id 
//     JOIN department ON role.department_id = department.id 
//     ORDER BY employee.id;`,
//         (err, data) => {
//             if (err) throw err;
//             console.table(data);
//         });
// }

// function viewRoles() {
//     connection.query(
//         `SELECT employee.first_name, 
//     employee.last_name, 
//     role.title 
//     AS Title FROM employee 
//     JOIN role ON employee.role_id = role.id;`,
//         (err, data) => {
//             if (err) throw err;
//             console.table(data);
//         });
// }

// function selectAllRoles() {
//     let role = [];
//     connection.query("SELECT * FROM role",
//         (err, data) => {
//             if (err) throw err;
//             for (let i = 0; i < data.length; i++) {
//                 role.push(data[i].title);
//             }
//         });
//     return role;
// }

// let manager = [];
// function selectManager() {

//     connection.query(
//         `SELECT first_name, 
//     last_name FROM employee 
//     WHERE manager_id IS NULL`,
//         (err, data) => {
//             if (err) throw err
//             for (let i = 0; i < data.length; i++) {
//                 manager.push(data[i].first_name);
//             }
//         });
//     return manager;
// }

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
            choices: selectAllRoles()
        },
        {
            name: "manager",
            type: "list",
            message: "Whats their managers name?",
            choices: selectManager()
        },
    ]).then(function (data) {

        console.log("manager: " + data.manager);

        console.log(selectAllRoles());

        let roleId = selectAllRoles().indexOf(data.role) + 1
        let managerId = selectManager().indexOf(data.manager) + 1

        console.log(roleId);
        console.log(managerId);

        connection.query(`INSERT INTO employee SET ?`,
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

function updateEmployee() {
    connection.query(
        `SELECT employee.last_name, role.title 
        FROM employee 
        JOIN role ON employee.role_id = role.id;`,
        (err, data) => {
            if (err) throw err;
            console.table(data);
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "list",
                    choices: () => {
                        let employeelastName = [];
                        for (let i = 0; i < data.length; i++) {
                            employeelastName.push(data[i].last_name);
                        }
                        return employeelastName;
                    },
                    message: "What is the employee's last name? ",
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is employee's new title? ",
                    choices: selectAllRoles()
                },
            ]).then((data) => {
                let roleId = selectAllRoles().indexOf(data.role) + 1;
                connection.query(`UPDATE employee SET WHERE ?`,
                    {
                        last_name: data.lastName
                    },
                    {
                        role_id: roleId
                    },
                    (err, data) => {
                        if (err) throw err
                        console.table(data)
                        direction()
                    })
            });
        });
}

function start() {
    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}

