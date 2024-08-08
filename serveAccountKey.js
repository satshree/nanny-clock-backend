require("dotenv").config();
const fs = require("fs");

function serve() {
  const accountKeyPath = "./serviceAccountKey.json";

  if (fs.existsSync(accountKeyPath)) {
    const serviceAccount = require(accountKeyPath);
    return serviceAccount;
  } else {
    // console.log("Cannot find serviceAccountKey.json");
    return JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString(
        "utf-8"
      )
    );
  }
}

module.exports = serve;
