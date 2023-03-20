const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Yellowsubmarine575!',
    database: 'employee_db'
});
connection.connect((err) => {
    if(err) throw err
});

module.exports = connection;