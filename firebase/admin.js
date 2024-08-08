const admin = require("firebase-admin");
const serveServiceAccount = require("../serveAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serveServiceAccount()),
});

module.exports = admin;
