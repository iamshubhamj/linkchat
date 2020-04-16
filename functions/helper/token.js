const admin = require('firebase-admin');
// code comments
module.exports = {
    decodedIdToken : async (token) => {
        // console.log('JWT TOKEN IS :',token);
        const getTokenPayload = await admin.auth().verifyIdToken(token);
        return getTokenPayload;
    }
  };
  