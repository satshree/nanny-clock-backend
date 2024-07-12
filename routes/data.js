const express = require("express");
const firestoreData = require("../firebase/data");

// ROUTER INSTANCE
const router = express.Router();

// DATA ROUTES
router.route("/get/:id").get(async (req, res) => {
  const filterDate =
    req.query.firstDay ?? req.query.lastDay
      ? [req.query.firstDay, req.query.lastDay]
      : [];

  const allData = await firestoreData.getData(req.params.id, filterDate);
  res.json(allData);
});

router.route("/add/:id").post(async (req, res) => {
  const data = {
    home: req.body.home,
    clockIn: req.body.clockIn,
    clockOut: req.body.clockOut,
    notes: req.body.notes,
  };

  res.json(await firestoreData.setData(data));
});

router
  .route("/set/:id")
  .post(async (req, res) => {
    const data = {
      notes: req.body.notes,
    };

    await firestoreData.updateData(req.params.id, data);
    const updatedData = getDataWithID(req.params.id);

    res.json(updatedData);
  })
  .delete(async (req, res) => {
    res.json(await firestoreData.removeData(req.params.id));
  });

module.exports = router;
