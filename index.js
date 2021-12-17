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
            switch(data.nav) {
                case "View all departments":
                    sql = `SELECT * FROM departments`;
                    db.query(sql, (err, rows) => {
                        console.log("The departments are as follows: ");
                        console.table(rows);
                        backToMenuPrompt();
                    });
                    break;
                case "View all roles":
                    sql = `SELECT roles.title, roles.salary, departments.name
                    AS department
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`;
                    db.query(sql, (err, rows) => {
                        console.log("The roles are as follows: ");
                        console.table(rows);
                        backToMenuPrompt();
                    });
                    break;
                case "View all employees":
                    sql = `SELECT * FROM employees`;
                    db.query(sql, (err, rows) => {
                        console.log("Here is a list of employees: ");
                        console.table(rows);
                        backToMenuPrompt();
                    });
                    break;
                case "Add a new department":
                    //function
                    break;
                case "Add a new role":
                    //function
                    break;
                case "Add a new employee":
                    //function
                    break;
                case "Update an employee role":
                    //function
                    break;
                default:
                    console.log("Ummm... something went wrong, try again!");
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