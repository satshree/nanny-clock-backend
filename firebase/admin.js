const admin = require("firebase-admin");
const serveServiceAccount = require("../serveAccountKey");

console.log("FIREBASE CONTENT", serveServiceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serveServiceAccount()),
});

module.exports = admin;
