const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');

db.connect(() => {
    init() 
});



function init() {
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

// view departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        if (err) throw err
        console.table (data)
        init()
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) throw err
        console.table (data)
        init()
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err
        console.table (data)
        init()
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
            viewDepartments()
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
            return viewRoles()
        })

    })
}
function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Enter employees first name',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'Enter employees last name',
            name: 'last_name'
        },
        
        {
            type: 'input',
            message: 'Enter their role ID',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter their manager`s ID',
            name: 'manager_id'
        },
    ])
    .then (response => {
        db.query(`insert into employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', ${response.last_name}, ${response.role_id}, ${response.manager_id})`, (err, data) => {
            if (err) throw err
            console.table (data)
            return viewEmployees()
        })

    })
}

function updateEmployeeRole() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Which employee`s role would you like to update? (choose and employee by ID)',
            name: 'employeeRole'
        },
        {
            type: 'input',
            message:'Which role would you like to assign to this employee?',
            name: 'newRole'
        },

    ])
    .then (response => {
        db.query(`UPDATE employee SET role_id = ? WHERE employee.id = ?, ('${response.newRole}', ${response.employeeRole})`, (err, data) => {
            if (err) throw err
            console.table (data)
            return viewEmployees()
        })

    })
}