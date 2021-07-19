const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    database: 'employee_managementDB',
});

//'INSERT INTO products SET? iceCreamCRUD.js
// Connect to the DB
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
            'Exit']

    })
        .then((response) => {
            if (response === "View Department") {
                console.log("You chose View Department.../n");
                viewDepartment();
            } else if (response.direction === "Add Employees") {
                console.log("You chose to Add Employees...\n");
                AddEmployees();
            }
            else if (response.direction === "Exit") {
                console.log("You chose to Exit .../n");
                connection.end();
            }
        })
}

function AddEmployees(){
    connection.query(

    )
}

function viewDepartment() {
    console.log("View Department function initialized");
    connection.query("SELECT * from department", (err, data) => {
        if (err) throw err;
        console.table(data);
        direction();
    })
}

function start() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data)
        direction();
    })
}
