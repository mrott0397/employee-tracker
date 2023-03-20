const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table');


mainMenu()
function mainMenu () {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role']
        }
    ])
    .then(response => {
        if (response.mainMenu == 'View all departments') {
            viewDepartments()
        }
        else if (response.mainMenu == 'View all roles') {
            viewRoles()
        }
        else if (response.mainMenu == 'View all employees') {
            viewEmployees()
        }
        else if (response.mainMenu == 'Add department') {
            addDepartment()
        }
        else if (response.mainMenu == 'Add role') {
            addRole()
        }
        else if (response.mainMenu == 'Add employee') {
            addEmployee()
        }
        else if (response.mainMenu == 'Update employee role') {
            updateEmployeeRole()
        }
          
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
        console.table (res)
        return mainMenu()
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err
        console.table (res)
        return mainMenu()
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        console.table (res)
        return mainMenu()
    })
}

function addDepartment() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter department name',
            name: 'name'
        }
    ])
    .then (response => {
        db.query(`insert into department (department_name) VALUES ('${response.name}')`, (err, res) => {
            if (err) throw err
            console.table (res)
            return mainMenu()
        })

    })
}

function addRole() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter role title',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter salary',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter department id',
            name: 'department_id'
        },

    ])
    .then (response => {
        db.query(`insert into roles (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.department_id})`, (err, res) => {
            if (err) throw err
            console.table (res)
            return mainMenu()
        })

    })
}
function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter role title',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter salary',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter department id',
            name: 'department_id'
        },

    ])
    .then (response => {
        db.query(`insert into roles (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.department_id})`, (err, res) => {
            if (err) throw err
            console.table (res)
            return mainMenu()
        })

    })
}
