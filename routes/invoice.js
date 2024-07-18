const express = require("express");
const { checkAuthenticityWithHome } = require("../middlewares/authenticity");
const { getInvoiceData } = require("../controllers/invoice");

// ROUTER INSTANCE
const router = express.Router();

// INVOICE ROUTES
router.route("/:id").get(checkAuthenticityWithHome, getInvoiceData);

module.exports = router;
