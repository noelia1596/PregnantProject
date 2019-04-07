const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'noe',
    database: 'pregnant',
    password: 'bar'
});

module.exports = pool.promise(); 