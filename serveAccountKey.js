require("dotenv").config();
const fs = require("fs");

function serve() {
  const accountKeyPath = "./serviceAccountKey.json";

  if (fs.existsSync(accountKeyPath)) {
    const serviceAccount = require(accountKeyPath);
    return serviceAccount;
  } else {
    // console.log("Cannot find serviceAccountKey.json");
    return {
      type: process.env.FIREBASE_ACCOUNT_SERVICE_TYPE,
      project_id: process.env.FIREBASE_ACCOUNT_SERVICE_PROJECTID,
      private_key_id: process.env.FIREBASE_ACCOUNT_SERVICE_PRIVATEKEYID,
      private_key: process.env.FIREBASE_ACCOUNT_SERVICE_PRIVATEKEY,
      client_email: process.env.FIREBASE_ACCOUNT_SERVICE_CLIENTEMAIL,
      client_id: process.env.FIREBASE_ACCOUNT_SERVICE_CLIENTID,
      auth_uri: process.env.FIREBASE_ACCOUNT_SERVICE_AUTHURI,
      token_uri: process.env.FIREBASE_ACCOUNT_SERVICE_TOKENURI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_ACCOUNT_SERVICE_AUTHPROVIDER,
      client_x509_cert_url: process.env.FIREBASE_ACCOUNT_SERVICE_CLIENTCERTURL,
      universe_domain: process.env.FIREBASE_ACCOUNT_SERVICE_UNIVERSALDOMAIN,
    };
  }
}

module.exports = serve;
