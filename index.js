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


// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    //   createProduct();
    start();
});

function direction(){
    inquirer.prompt({
        name: "direction",
        type:""
    })
}

function start() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
}
