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


const viewAllEmployees = () => {
    connection.query(`
    SELECT employees.id AS 'ID', employees.first_name AS 'First Name', employees.last_name AS 'Last Name', employees.manager_id AS 'Manager ID', role.title, role.salary, departments.name AS 'department'
    FROM employees
    LEFT JOIN role 
    ON employees.role_id = role.id
    LEFT JOIN departments 
    ON role.department_id = departments.id

    `, 
    function (err, res) {
      if (err) throw err;
      console.table(res);
    });
}


const viewByDepartment = () => {
    //Need to make this dynamic
    var departments = []

    connection.query('SELECT name FROM departments', 
    function (err, res){
      if (err) throw err;
      res.forEach(({name}) => {
        departments.push(`${name}`)
    });

    

        inquirer.prompt({
            name: 'departmentChoices',
            type: 'list',
            message: 'Which department would you like to view?',
            choices: departments
        }).then((answer) => {
            departmentChosen = answer.departmentChoices;
            connection.query(
                `SELECT employees.id AS 'ID', employees.first_name AS 'First Name', employees.last_name AS 'Last Name', employees.manager_id AS 'manager ID', role.title, role.salary, departments.name 
                FROM employees  
                LEFT JOIN role 
                ON employees.role_id = role.id
                LEFT JOIN departments 
                ON role.department_id = departments.id
                WHERE departments.name = '${departmentChosen}';`, 
                function (err, res) {
                if (err) throw err;
                console.table(res);
             }
            );
        });
    });

};

const viewByManager = () => {

}
 
const viewDepartments = () => {
    connection.query('SELECT * FROM departments;',
     function (err, res) {
            if(err) throw err;
            console.table(res)
        });
};

const viewRoles = () => {
    connection.query(`
    SELECT role.id AS ID, role.title AS TITLE, role.salary AS Salary, departments.name AS Department FROM role
    LEFT JOIN departments 
    ON role.department_id = departments.id;
    `, 
    function (err, res){
      if (err) throw err;
        console.table(res)
    });

}


 var viewFunctions = { 
    viewAllEmployees,
    viewByDepartment,
    viewRoles,
    viewDepartments
};

module.exports = viewFunctions;