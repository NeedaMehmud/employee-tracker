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
                    query.addRole()
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



function start() {
    connection.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}



    



