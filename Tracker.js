//import necessary packages
const mysql = require('mysql');
const inquirer = require('inquirer');


//Import local modules
const viewFunctions = require('./scripts/view.js')
const deleteFunctions = require('./scripts/delete.js')
const updateFunctions = require('./scripts/update.js')
const addFunctions = require('./scripts/add.js')




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
              'Add Employee',
              'Remove Employee',
              'Update Employee Role',
              'View Roles', 
              'Add Role', 
              'Remove Role',
              'View Departments',
              'Add Department', 
              'Remove Department',
              'Exit'
          ]
      })
      .then((answer) => {
          switch (answer.action){
            case 'View All Employees':
                viewFunctions.viewAllEmployees();
                break;

            case 'View All Employees by Department':
                viewFunctions.viewByDepartment();
                break;

          /*   case 'View All Employees by Manager':
                viewByManager();
                break; */

            case 'Add Employee':
                addFunctions.addEmployees();
                break

            case 'Remove Employee':
                deleteFunctions.deleteEmployee();
                break;

            case 'Update Employee Role':
                updateFunctions.updateEmployeeRole();
                break;

           /*  case 'Update Employee Manager':
                updateManager();
                break; */

            case 'View Roles':
                viewFunctions.viewRoles();
                break;

            case 'Add Role':
                addFunctions.addRoles();
                break;

            case 'Remove Role':
                deleteFunctions.deleteRole();
                break;
            case 'View Departments':
                viewFunctions.viewDepartments();
                break;
            
            case 'Add Department':
                addFunctions.addDepartment();
                break;

            case 'Remove Department':
                deleteFunctions.deleteDepartment();

            case 'Exit':
                connection.end();
                break;
          }
      })
  }





