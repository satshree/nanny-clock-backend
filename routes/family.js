const express = require("express");
const { getFamily, addFamily, removeFamily } = require("../controllers/family");

// ROUTER INSTANCE
const router = express.Router();

// FAMILY ROUTES
router.route("/add").post(addFamily);

router.route("/get/:id").get(getFamily);

router.route("/delete/:id").delete(removeFamily);

module.exports = router;
