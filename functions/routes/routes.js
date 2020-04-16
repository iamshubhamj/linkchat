const express = require('express');
const router = express.Router();
const sqlController = require('../controller/sqldata-controller');

//configuration to call function
router.get(`/cloud/sql/data`, sqlController.sqlData);
module.exports = router;