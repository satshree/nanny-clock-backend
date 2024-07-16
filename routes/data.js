const express = require("express");
const {
  getAllData,
  createData,
  editData,
  deleteData,
} = require("../controllers/data");

// ROUTER INSTANCE
const router = express.Router();

// DATA ROUTES
router.route("/get/:id").get(getAllData);

router.route("/add/:id").post(createData);

router.route("/set/:id").post(editData).delete(deleteData);

module.exports = router;
