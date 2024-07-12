const express = require("express");
const firestoreData = require("../firebase/data");

// ROUTER INSTANCE
const router = express.Router();

// FAMILY ROUTES
router.route("/add").post(async (req, res) => {
  const home = req.body.home;
  const user = req.user;

  const newFamily = await firestoreData.addFamily(home, user);

  res.json({ message: "New family member added", data: newFamily });
});

router
  .route("/get/:id")
  .get(async (req, res) =>
    res.json(await firestoreData.getFamilyList(req.params.id, req.user))
  );

router.route("/delete/:id").delete(async (req, res) => {
  await firestoreData.removeFamily(req.params.id);

  res.json({ message: "Family member removed" });
});

module.exports = router;
