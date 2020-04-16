const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const config = require('./config/common/function-config');
const serviceAccount = require('./config/deployment/gcpservice-config/gcpserviceconfig-dev.json');
const authMiddleware = require('./controller').auth.validateFirebaseIdToken;
const server = express();
const routes = require('./routes/routes');
const baseURL = "/" + config.waldenServerless.apiVersion + "/rest/";
/**
  @description 
 * .all() method ll use to handel all unwanted(Non Traceble) API. 
 * Process event ll trigger To handel all callback rejection in an App.
 * Created dummy API for Cloud function called and configure in routes folder .
 * envoiroment variable
 * firebase envoiroment variable use to run while deployment time with the help of functions.config()
 * If firebase projects run in local system then firebase env ll setup with hardcoded string variable.
 */
 

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
server.use(bodyParser.json());
server.use(cors);
// uncomment when jwt initiate from FE.
//server.use(authMiddleware);
// Configuration of cloud function
server.use(`${baseURL}`, routes);
server.all('*', (req, res) =>
	res.status(404).send({
		message: 'Not Found'
	})
);
process.on('unhandledRejection', (reason) => {
	console.log('********************************');
	console.log('Reason: ' + reason);
	console.log('********************************');
});

exports[config.waldenServerless.Function] = functions.https.onRequest(server);
