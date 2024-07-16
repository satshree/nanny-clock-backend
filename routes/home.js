const express = require("express");
const firestoreData = require("../firebase/data");
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

router.route("/:id").get(fetchHome).put(updateHome).delete(deleteHome);

module.exports = router;
