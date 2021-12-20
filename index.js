const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

function employeeTime() {
    console.log("Welcome to the employee database main menu!")

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'nav',
                message: "What would you like to do?",
                choices: [new inquirer.Separator(), "View all departments", new inquirer.Separator(), "View all roles", new inquirer.Separator(), "View all employees", new inquirer.Separator(), "Add a new department", new inquirer.Separator(), "Add a new role", new inquirer.Separator(), "Add a new employee", new inquirer.Separator, "Update an employee role"]
            }
        ])
        .then(data => {
            let sql;
            let params;
            switch(data.nav) {
                case "View all departments":
                    sql = `SELECT * FROM departments`;
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log("Something went wrong... please try again!");
                        } else {
                            console.log("The departments are as follows: ");
                            console.table(rows);
                        }
                        backToMenuPrompt();
                    });
                    break;
                case "View all roles":
                    sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                    AS department
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`;
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log("Something went wrong... please try again!");
                        } else {
                            console.log("The roles are as follows: ");
                            console.table(rows);
                        }
                        backToMenuPrompt();
                    });
                    break;
                case "View all employees":
                    sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, manager_id AS manager
                    FROM employees
                    LEFT JOIN roles ON employees.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id`;
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log("Something went wrong... please try again!");
                        } else {
                            console.log("Here is a list of employees: ");
                            console.table(rows);
                        }
                        backToMenuPrompt();
                    });
                    break;
                case "Add a new department":
                    inquirer
                        .prompt([
                            {
                                type: "text",
                                name: "department",
                                message: "Please enter the name of the new department: ",
                                validate: departmentInput => {
                                    if (departmentInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter a name for the department!');
                                        return false;
                                    }
                                }
                            }
                        ])
                        .then(data => {
                            sql = `INSERT INTO departments (name) VALUES (?)`;
                            params = [data.department];
                            db.query(sql, params, (err, rows) => {
                                if (err) {
                                    console.log("Something went wrong... check to make sure you entered the correct information!");
                                } else {
                                    console.log("New department added successfully!");
                                }
                                backToMenuPrompt();
                            });
                        });
                    break;
                case "Add a new role":
                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: "roleName",
                                message: "Please enter the name of the new role: ",
                                validate: roleInput => {
                                    if (roleInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter a name for the new role!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: "Please enter the salary for this role: ",
                                validate: salaryInput => {
                                    if (salaryInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter the salary for this role!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'number',
                                name: 'departmentId',
                                message: "Please enter the department ID for this role: ",
                                validate: departmentIdInput => {
                                    if (departmentIdInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the associated ID!");
                                        return false;
                                    }
                                }
                            }
                        ])
                        .then(data => {
                            sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                            params = [data.roleName, data.salary, data.departmentId];
                            db.query(sql,params, (err, rows) => {
                                if (err) {
                                    console.log("Something went wrong... check to make sure your inputs were valid!");
                                } else {
                                    console.log("New role added successfully!");
                                }
                                backToMenuPrompt();
                            });
                        });
                    break;
                case "Add a new employee":
                    inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: "firstName",
                                message: "Please enter the employee's first name: ",
                                validate: firstNameInput => {
                                    if (firstNameInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the employee's first name!");
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'text',
                                name: "lastName",
                                message: "Please enter the employee's last name: ",
                                validate: lastNameInput => {
                                    if (lastNameInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the employee's last name!");
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'number',
                                name: 'roleId',
                                message: "Please enter the role ID to match this employee's position: ",
                                validate: roleIdInput => {
                                    if (roleIdInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter the associated ID!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'number',
                                name: 'managerId',
                                message: "Please enter the ID of this employee's manager (if applicable): ",
                            }
                        ])
                        .then(data => {
                            if (Number.isInteger(data.managerId)) {
                                sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                                params = [data.firstName, data.lastName, data.roleId, data.managerId];
                            } else {
                                data.managerId = null;
                                sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                                params = [data.firstName, data.lastName, data.roleId, data.managerId];
                            }
                            db.query(sql,params, (err, rows) => {
                                if (err) {
                                    console.log("Something went wrong... check to make sure your inputs were valid!");
                                } else {
                                    console.log("New employee added successfully!");
                                }
                                backToMenuPrompt();
                            });
                        });
                    break;
                case "Update an employee role":
                    inquirer
                        .prompt([
                            {
                                type: "number",
                                name: "employeeId",
                                message: "Please enter the ID of the employee you'd like to update: ",
                                validate: employeeIdInput => {
                                    if (employeeIdInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the ID of the employee you'd like to update!");
                                        return false;
                                    }
                                }
                            },
                            {
                                type: "number",
                                name: "newRole",
                                message: "Please enter the ID of the new role for the employee: ",
                                validate: newRoleInput => {
                                    if (newRoleInput) {
                                        return true;
                                    } else {
                                        console.log("Please enter the new role!");
                                        return false;
                                    }
                                }
                            }
                        ])
                        .then(data => {
                            sql = `UPDATE employees SET role_id = ?
                            WHERE id =?`;
                            params = [data.newRole, data.employeeId];
                            db.query(sql, params, (err, rows) => {
                                if (err) {
                                    console.log("Something went wrong... check to make sure you have the right IDs!");
                                } else {
                                    console.log("The employee's role was updated!");
                                }
                                backToMenuPrompt();
                            });
                        });
                    break;
                default:
                    console.log("Ummm... something went REALLY wrong, try again!");
                    break;
            }
        }
            
        )
};

function backToMenuPrompt() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirmBackToMenu',
                message: "Would you like to return to the main menu?",
                default: false
            }
        ])
        .then(data => {
            if (data.confirmBackToMenu) {
                employeeTime();
            } else {
                console.log("Press CTRL + C or close this window to end the application. Bye-bye!");
            }
        });
}

employeeTime();