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


const deleteRole = () => {

    var roles = ['None']
    
    connection.query('SELECT title FROM role', 
    function (err, res){
        console.log(res)
      if (err) throw err;
      res.forEach(({title}) => {
        roles.push(`${title}`)
        });
        inquirer.prompt({
            name: 'deletedRole',
            type: 'list',
            message: 'What is the name of the role you would like to delete?',
            choices: roles
        }).then((answer) => {
    
            if (answer.deletedRole == 'None'){
                console.log('Nothing was deleted')
            }else {
            var query = `DELETE FROM employees_db.role 
            WHERE title = ('${answer.deletedRole}')`
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(`The department ${answer.deletedRole} was deleted to the departments database`)
            })

            connection.query('SELECT * FROM role',
            function(err, res) {
                if (err) throw err;
                console.table(res)
            })
        }
        })

       
    });
}



const deleteEmployee = () => {
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee you would like to delete?'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee you would like to delete?'
    }]).then((answer) => {

        connection.query(`
        DELETE FROM employees_db.employees
        WHERE employees.first_name = '${answer.firstName}' AND employees.last_name = '${answer.lastName}'
    `, function (err, res){
        if (err) throw err;

      })

      connection.query('SELECT * FROM employees',
      function(err, res) {
          if (err) throw err;
          console.table(res)
              }); 
        
    });

    
};


var deleteFunctions = { 
    deleteRole,
    deleteDepartment,
    deleteEmployee
};

module.exports = deleteFunctions;