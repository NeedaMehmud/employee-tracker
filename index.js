const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
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
        // .then((response) => {
        //     if (response === "View Department") {
        //         console.log("You chose View Department.../n");
        //         viewDepartment();
        //     } else if (response.direction === "Add Employees") {
        //         console.log("You chose to Add Employees...\n");
        //         AddEmployees();
        //     }
        //     else if (response.direction === "Exit") {
        //         console.log("You chose to Exit .../n");
        //         connection.end();
        //     }
        // });
        .then(function (data) {
            switch (data.choice) {
                case "View All Employees?":
                    break;
                case "View All Employee's By Roles?":
                    break;
                case "View all Emplyees By Deparments":
                    break;
                case "Add Employee?":
                    break;
                case "Update Employee's role":
                    break;
                case "Add Role?":
                    break;
                case "Add Department?":
                    break;
                case "Exit":
                    break;

            }
        })

}

function AddEmployees() {
    connection.query('Select * from role', (err, data) => {
        // OR
        // const roleChoices = data.map(role) => {
        //     return {
        //         name: role.title,
        //         value: role.id,
        //     }
    })
    // console.table(data)
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
