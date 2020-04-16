const _sqlManager = require('../helper/sqldata-manager-helper');

module.exports = {
  sqlData: async (req, res) => {
    await _sqlManager.executeCloudSqlQuery(req.query._sqlQuery)
      .then(resObj => {
        if(resObj)
        res.status(200).send(resObj);
        else
        res.status(403).send({
            message: 'Forbidden',
            Status: 'Failure'
        });
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
}