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
    deleteDepartment();
  });

 
const deleteDepartment = () => {

    var departments = []

    connection.query('SELECT name FROM departments', 
    function (err, res){
        console.log(res)
      if (err) throw err;
      res.forEach(({name}) => {
        departments.push(`${name}`)
        });
        inquirer.prompt({
            name: 'deletedDepartment',
            type: 'list',
            message: 'What is the name of the department you would like to delete?',
            choices: departments
        }).then((answer) => {
    
            var query = `DELETE FROM employees_db.departments 
            WHERE name = ('${answer.deletedDepartment}')`
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(`The department ${answer} was deleted to the departments database`)
            })
    
            connection.query('SELECT * FROM departments',
            function(err, res) {
                if (err) throw err;
                console.table(res)
            })
        })

       
    });
}
