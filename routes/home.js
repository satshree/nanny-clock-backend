const express = require("express");
const { checkAuthenticityWithHome } = require("../middlewares/authenticity");
const {
  fetchHome,
  fetchHomeList,
  createHome,
  updateHome,
  deleteHome,
} = require("../controllers/home");

// ROUTER INSTANCE
const router = express.Router();

// HOME ROUTE
router.route("/").get(fetchHomeList).post(createHome);

router
  .route("/:id")
  .get(checkAuthenticityWithHome, fetchHome)
  .put(checkAuthenticityWithHome, updateHome)
  .delete(checkAuthenticityWithHome, deleteHome);

module.exports = router;
