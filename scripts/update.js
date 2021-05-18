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
  });


const updateEmployeeRole = () => {

    var roles = []
    connection.query(`SELECT DISTINCT role.title FROM role`, 
    function (err, res){
        if (err) throw err;

        res.forEach(({title}) => {
          if (!roles.includes(title)){
                roles.push(`${title}`)
            }
        });

        inquirer.prompt([{
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the employee whose role you would like to update?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the employee whose role you would like to update?'
            },
            {
                name: 'newRole',
                type: 'list',
                message: 'What is the their new role?',
                choices: roles
            } 
            ]).then((answer) => {
                connection.query(`
                UPDATE employees 
                SET employees.role_id = ${(roles.indexOf(answer.newRole) +1)}
                WHERE employees.first_name = '${answer.firstName}'
                AND employees.last_name = '${answer.lastName}'`, 
                function(err, res){
                    if (err) throw err;
                })
            })
        })
  };



const updateEmployeeManager = () => {

}

var updateFunctions = { 
    updateEmployeeRole,
    updateEmployeeManager
};
module.exports = updateFunctions