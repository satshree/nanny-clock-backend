const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { verifyToken } = require("./firebase/middlewares");

// EXPRESS APP
const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// CORS
app.use(cors());

// VIEW ENGINE
app.set("view engine", "ejs");

// FIREBASE AUTHENTICATION
app.use(verifyToken);

// SERVER
const port = process.env.PORT || 8000; // Use environment variable or default port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
