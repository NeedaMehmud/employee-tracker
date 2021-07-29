const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'employee_managementDB',
});


function selectAllRoles() {
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

let manager = [];
function selectManager() {
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

    addEmployee() { 
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
              choices: selectRole()
            },
            {
                name: "choice",
                type: "rawlist",
                message: "Whats their managers name?",
                choices: selectManager()
            }
        ]).then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1
          var managerId = selectManager().indexOf(val.choice) + 1
          connection.query("INSERT INTO employee SET ?", 
          {
              first_name: val.firstName,
              last_name: val.lastName,
              manager_id: managerId,
              role_id: roleId
              
          }, function(err){
              if (err) throw err
              console.table(val)
              startPrompt()
          })
    
      })
    }
}

module.exports = Queries;



