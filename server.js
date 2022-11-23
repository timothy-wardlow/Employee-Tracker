const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const sequelize = require('./config/connection');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'lIndSey11$',
  database: 'business_db',
});

connection.connect(err => {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker!");
  startPrompt();
});

const startPrompt = () => {
  inquirer.prompt({
      message: 'What would you like to do today?',
      name: 'menu',
      type: 'list',
      choices: [ 
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit',
      ],
    })
    .then(response => {
        switch (response.menu) {
        case 'View all departments':
          viewDepartment();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM departments', function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const viewEmployees = () => {
  connection.query(
    'SELECT employees.id, first_name, last_name, title, salary, department_name, manager_id FROM ((departments JOIN roles ON departments.id = roles.department_id) JOIN employees ON roles.id = employees.role_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
};

const addDepartment = () => {
  inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the department name?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO departments (department_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department added!');
          startPrompt();
        }
      );
    });
};

const addRole = () => {
  inquirer.prompt([
      {
        name: 'roleTitle',
        type: 'input',
        message: 'What is the role title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?',
      },
      {
        name: 'deptId',
        type: 'input',
        message: 'What is the department ID number?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.roleTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log('Role added!');
          startPrompt();
        }
      );
    });
};

const addEmployee = () => {
  inquirer.prompt([
      {
        name: 'nameFirst',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'nameLast',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'roleId',
        type: 'input',
        message: "What is the employee's role id?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the manager Id?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.roleId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added!');
          startPrompt();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter new role id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employees SET role_id=? WHERE id=?',
        [answer.roleId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          startPrompt();
        }
      );
    });
};