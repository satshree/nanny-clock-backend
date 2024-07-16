const express = require("express");
const {
  getTotalDataNumbers,
  getDailyDataNumbers,
  getMonthlyDataNumbers,
} = require("../controllers/analytics");

// ROUTER INSTANCE
const router = express.Router();

// ANALYTICS ROUTE
router.route("/total/:id").get(getTotalDataNumbers);
router.route("/daily/:id").get(getDailyDataNumbers);
router.route("/monthly/:id").get(getMonthlyDataNumbers);

module.exports = router;
