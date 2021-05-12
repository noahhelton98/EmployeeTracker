const inquirer = require("inquirer");



const viewAllEmployees= () => {
    const query = 
    'SELECT * FROM employees_db'
};

const viewByDepartment = () => {

    const query = 
    'SELECT DISTINCT name FROM departments'

    const departmentArray = [];

    connection.query(query, (err, res) => {
        res.forEach(({ name }) => {
            departmentArray.push(name)
        });
    })    


    inquirer.prompt({
        name: 'departmentChoices',
        type: 'list',
        message: 'Which department would you like to view?',
        choices = departmentArray
    }).then((answer) => {
        departmentChosen = answer.departmentChoices;

        connection.query(
            `SELECT * FROM employees WHERE department = ${departmentChosen}
            LEFT JOIN role on employees.role_id = role.id
            LEFT JOIN role on employees.department_id = department.id`
        )

    })
};

const viewByManager = () => {

}


module.exports = view;