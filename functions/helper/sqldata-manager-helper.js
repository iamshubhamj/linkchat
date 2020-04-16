const pool = require('../helper/mysql-connecter-helper');

module.exports = {
    executeCloudSqlQuery: async query => {
        const cloudsql_Query = `${query}`;
        return new Promise((resolve, reject) => {
            pool.getConnection(async (err, connection) => {
                if (err) {
                    console.log(err);
                    connection.release();
                    return reject(err);
                    throw err;
                }
                connection.query(cloudsql_Query, async (err, rows) => {
                    connection.release();
                    if (!err) {
                        if (rows)
                            return resolve(rows);
                    }
                    else
                        return resolve(false);
                });
                connection.on('error', function (err) {
                    return reject(err);
                    throw err;
                });
            });
        })
    }
}