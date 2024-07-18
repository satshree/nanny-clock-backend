const express = require("express");
const { checkAuthenticityWithHome } = require("../middlewares/authenticity");
const {
  getTotalDataNumbers,
  getDailyDataNumbers,
  getMonthlyDataNumbers,
} = require("../controllers/analytics");

// ROUTER INSTANCE
const router = express.Router();

// ANALYTICS ROUTE
router.route("/total/:id").get(checkAuthenticityWithHome, getTotalDataNumbers);
router.route("/daily/:id").get(checkAuthenticityWithHome, getDailyDataNumbers);
router
  .route("/monthly/:id")
  .get(checkAuthenticityWithHome, getMonthlyDataNumbers);

module.exports = router;
