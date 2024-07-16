const express = require("express");
const {
  getFamily,
  addToFamily,
  deleteFamily,
} = require("../controllers/family");

// ROUTER INSTANCE
const router = express.Router();

// FAMILY ROUTES
router.route("/add").post(addToFamily);

router.route("/get/:id").get(getFamily);

router.route("/delete/:id").delete(deleteFamily);

module.exports = router;
