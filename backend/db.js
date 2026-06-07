const  mysql = require('mysql2');

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    } else {
        console.log('Conectado com o banco de dados MySQL!');
    }
})

module.exports = db;