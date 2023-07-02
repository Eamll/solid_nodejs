const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'alexis123',
    port: 3306,
    password: 'alexis123',
    database: 'bdpruebas',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database.');

    // You can perform database operations here
});

module.exports = connection;
