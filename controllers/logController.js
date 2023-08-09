const db = require('../models/mysqldb.js');

async function logAction(operation, username) {
    var query = 'SELECT * from `log`'

    await db.query(query).then(async (result) => {
        var logID = result.length + 1;

        var query = "INSERT INTO `log` (logID, operation, username) values ('" + logID + "', '" + operation + "', '" + username + "');";

        await db.query(query)
    });
}

module.exports = {
    logAction
};