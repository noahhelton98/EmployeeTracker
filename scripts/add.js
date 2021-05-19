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

    var departments = []

    connection.query('SELECT name FROM departments', 
    function (err, res){
      if (err) throw err;
      res.forEach(({name}) => {
        departments.push(`${name}`)
    });

        inquirer.prompt([{
        name: 'newRole',
        type: 'input',
        message: 'What is the name of the new role you would like to add?',
        },{
            name: 'newSalary',
            type: 'input',
            message: 'What is the salary of the new role you are adding?'
        },
        {
            name: 'department',
            type: 'list',
            message: 'Which department is your new role a part of?',
            choices: departments

        }]).then((answer) => {

            console.log('Your new role was added successfully.')

          var query = `INSERT INTO employees_db.role (title, salary, department_id)
            VALUES ('${answer.newRole}', ${answer.newSalary}, ${(departments.indexOf(answer.department) +1)})`
            connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log(`The department ${answer.newRole} was added to the departments database`)
                }) 

    connection.query('SELECT * FROM role',
    function(err, res) {
        if (err) throw err;
        console.table(res)
            });
        });
    })
  }

  const addEmployees = () => {
  /*   var managers = ['They Are a Manager']

    connection.query(`
    SELECT employees.first_name, employees.last_name, employees.manager_id
    FROM employees
    WHERE manager_id IS NULL`, 
    function (err, res){
        if (err) throw err;
        //console.log(res)
         res.forEach(({first_name, last_name}) => {
            managers.push(`${first_name}`)
            console.log(managers)
      }) 
        }
    ) */

    var departments = []
    var roles = []
    var managers = ['They Are a Manager']

    connection.query(` SELECT DISTINCT departments.name,role.title, employees.first_name, employees.last_name, employees.manager_id FROM departments,role, employees
    WHERE manager_id IS NULL`, 
    function (err, res){
      if (err) throw err;
      res.forEach(({name, title, first_name, last_name}) => {
          if (!departments.includes(name)){
            departments.push(`${name}`)
          }
          if (!roles.includes(title)){
                roles.push(`${title}`)
          }

          if (!managers.includes(first_name + ' ' +  last_name)){
            managers.push(`${first_name} ${last_name}`)

          }

    });
        inquirer.prompt([{
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the new employee?',
        },{
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the new employee?'
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: "What is the new employee's role?",
            choices: roles

        },
        {
            name: 'managerID',
            type: 'input',
            message: "What is their manager's ID?",
            choices: managers
        }
    
    ]).then((answer) => {

            console.log('Your new employee was added successfully.')


            var manager;

            if (!answer.managerID){
                manager = 'NULL'
            }else{
                manager = answer.managerID
            }
            
            /* else {
                var splitName = answer.isManager.split(' ');
                connection.query(`SELECT employees.id FROM employees 
                WHERE employees.first_name = '${splitName[0]}' AND employees.last_name = '${splitName[1]}'`, 
                (err, res) => {
                    if (err) throw err;
                    console.log(res)
                    manager.push('A')
                })
            } */


          var query = `INSERT INTO employees_db.employees (first_name, last_name, role_id, manager_id)
            VALUES ('${answer.firstName}', '${answer.lastName}', ${(roles.indexOf(answer.employeeRole) +1)}, ${answer.managerID})`
            connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log(`${answer.firstName} was added to the to your employee database!`)
                }) 

    connection.query('SELECT * FROM employees',
    function(err, res) {
        if (err) throw err;
        console.table(res)
            }); 
        });
    })
  }

var addFunctions = { 
    addDepartment,
    addRoles,
    addEmployees
};
module.exports = addFunctions;