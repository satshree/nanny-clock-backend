const express = require("express");
const { getInvoiceData } = require("../controllers/invoice");

// ROUTER INSTANCE
const router = express.Router();

// INVOICE ROUTES
router.route("/:id").get(getInvoiceData);

module.exports = router;
