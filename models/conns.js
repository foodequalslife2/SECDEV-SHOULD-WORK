const db = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "secdv_mic",
    connectionLimit: 10
};

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = { db }