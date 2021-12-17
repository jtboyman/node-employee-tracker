const mysql = require('mysql2'); //connect to mysql database

//connect to database (get this in server.js)
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mysql username,
        user: 'root',
        // your mysql password
        password: 'NEW_USER_PASSWORD',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database!')
);

module.exports = db;