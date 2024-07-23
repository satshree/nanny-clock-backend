const express = require("express");
const { checkAuthenticityWithHome } = require("../middlewares/authenticity");
const { getHomeSettings, setHomeSettings } = require("../controllers/settings");

// ROUTER INSTANCE
const router = express.Router();

// HOME ROUTE
router
  .route("/:id")
  .get(checkAuthenticityWithHome, getHomeSettings)
  .put(checkAuthenticityWithHome, setHomeSettings);

module.exports = router;
