const express = require("express");
const {
  checkAuthenticityWithHome,
  checkAuthenticityWithFamily,
} = require("../middlewares/authenticity");
const {
  getFamily,
  addToFamily,
  deleteFamily,
} = require("../controllers/family");

// ROUTER INSTANCE
const router = express.Router();

// FAMILY ROUTES
router.route("/add").post(addToFamily);

router.route("/get/:id").get(checkAuthenticityWithHome, getFamily);

router.route("/delete/:id").delete(checkAuthenticityWithFamily, deleteFamily);

module.exports = router;
