const mysql = require('mysql');
const config = require('../config/deployment/cloudsql-config/cloudsqlconfig-local.json');
const _deploymentConfig = require('../config/deployment/cloudsql-config/cloudsqlconfig-dev.json');

// Initialize pool
let pool;
if(config.LOCAL_MACHINE)
  pool = mysql.createPool({
    connectionLimit: 10,
    socketPath: process.env.SOCKET_PATH || config.SOCKET_PATH,
    host: process.env.DB_HOST || config.HOST,
    user: process.env.DB_USER || config.USER,
    password: process.env.DB_PASS || config.PASSWORD,
    database: process.env.DB_NAME || config.NAME,
    debug: false
});
else
pool = mysql.createPool({
    connectionLimit: 10,
    socketPath: process.env.SOCKET_PATH || _deploymentConfig.SOCKET_PATH,
    host: process.env.DB_HOST || _deploymentConfig.HOST,
    user: process.env.DB_USER || _deploymentConfig.USER,
    password: process.env.DB_PASS || _deploymentConfig.PASSWORD,
    database: process.env.DB_NAME || _deploymentConfig.NAME,
    debug: false
});

module.exports = pool;




