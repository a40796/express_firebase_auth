var admin = require("firebase-admin");

var serviceAccount = require("../auth-cb15c-firebase-adminsdk-tprh8-ee641155bf");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-cb15c-default-rtdb.firebaseio.com"
});



module.exports = admin;
