const express = require("express");
const {
  checkAuthenticityWithData,
  checkAuthenticityWithHome,
} = require("../middlewares/authenticity");
const {
  getAllData,
  createData,
  editData,
  deleteData,
} = require("../controllers/data");

// ROUTER INSTANCE
const router = express.Router();

// DATA ROUTES
router.route("/get/:id").get(checkAuthenticityWithHome, getAllData);

router.route("/add/:id").post(checkAuthenticityWithHome, createData);

router
  .route("/set/:id")
  .post(checkAuthenticityWithData, editData)
  .delete(checkAuthenticityWithData, deleteData);

module.exports = router;
