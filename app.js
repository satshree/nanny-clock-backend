const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// VIEW ENGINE
app.set("view engine", "ejs");

// SERVER
const port = process.env.PORT || 3000; // Use environment variable or default port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
