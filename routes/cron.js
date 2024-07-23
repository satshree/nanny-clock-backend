const express = require("express");
const { autoClockHomes } = require("../controllers/cron");

// ROUTER INSTANCE
const router = express.Router();

router.route("/auto-clock").get(autoClockHomes);

module.exports = router;
