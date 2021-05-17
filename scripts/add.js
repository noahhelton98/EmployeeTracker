const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    addDepartment();
  });


  const addDepartment = () => {

    //Ask the name of the New department 
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the new department you would like to add?',
    }).then((answer) => {

        var query = `INSERT INTO employees_db.departments (name)
        VALUES ('${answer.newDepartment}')`
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(`The department ${answer} was added to the departments database`)
        })

        connection.query('SELECT * FROM departments',
        function(err, res) {
            if (err) throw err;
            console.table(res)
        })
    })
}


  const addRoles = () => {

  }

  const addEmployees = () => {

  }