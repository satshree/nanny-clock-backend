import cors from "cors";
import express from "express";
import { json } from "body-parser";
import homeRouter from "./routes/home";
import { verifyToken } from "./firebase/middlewares";

// EXPRESS APP
const app = express();
app.use(json()); // Parse JSON requests

// CORS
app.use(cors());

// VIEW ENGINE
app.set("view engine", "ejs");

// FIREBASE AUTHENTICATION
app.use(verifyToken);

// API ROUTES WITH AUTHENTICATION
app.use("/api/home", homeRouter);

// SERVER
const port = process.env.PORT || 8000; // Use environment variable or default port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
