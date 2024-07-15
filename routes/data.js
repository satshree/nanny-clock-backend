const express = require("express");
const {
  getAllData,
  setData,
  updateData,
  deleteData,
} = require("../controllers/data");

// ROUTER INSTANCE
const router = express.Router();

// DATA ROUTES
router.route("/get/:id").get(getAllData);

router.route("/add/:id").post(setData);

router.route("/set/:id").post(updateData).delete(deleteData);

module.exports = router;
