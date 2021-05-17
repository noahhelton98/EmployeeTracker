//import necessary packages
const mysql = require('mysql');
const inquirer = require('inquirer');


//Import local modules
const view = require('scripts/view.js')




//set up connections
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    promptUser();
  });

const promptUser = () => {
      inquirer.prompt({
          name:'action',
          type:'list',
          message: 'What would you like to do?',
          choices: [
              'View All Employees',
              'View All Employees by Department', 
              'View All Employees by Manager', 
              'Add Employee',
              'Remove Employee',
              'Update Employee Role',
              'Update Employee Manager', 
              'View All Roles', 
              'Add Role', 
              'Remove Role',
              'View All Departments',
              'Add Department', 
              'Remove Department',
              'Exit'
          ]
      })
      .then((answer) => {
          switch (answer.action){
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Employees by Department':
                viewByDepartment();
                break;

            case 'View All Employees by Manager':
                viewByManager();
                break;

            case 'Add Employee':
                addEmployee();
                break

            case 'Remove Employee':
                removeEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Update Employee Manager':
                updateManager();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Remove Role':
                removeRole();
                break;
            case 'Exit':
                connection.end();
                break;
          }
      })
  }



  