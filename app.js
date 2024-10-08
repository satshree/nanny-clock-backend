require("dotenv").config();

const cors = require("cors");
const express = require("express");
const homeRouter = require("./routes/home");
const dataRouter = require("./routes/data");
const familyRouter = require("./routes/family");
const analyticsRouter = require("./routes/analytics");
const invoiceRouter = require("./routes/invoice");
const settingsRouter = require("./routes/settings");
const cronRouter = require("./routes/cron");
const { verifyToken } = require("./middlewares");

// EXPRESS APP
const app = express();
app.use(express.json()); // Parse JSON requests

// CORS
app.use(cors());

// VIEW ENGINE
app.set("view engine", "ejs");

// API WITHOUT AUTHENTICATION
app.use("/api/cron", cronRouter);

// FIREBASE AUTHENTICATION
app.use(verifyToken);

// API ROUTES WITH AUTHENTICATION
app.use("/api/home", homeRouter);
app.use("/api/data", dataRouter);
app.use("/api/family", familyRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/settings", settingsRouter);

// SERVER
const port = process.env.PORT || 8000; // Use environment variable or default port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
