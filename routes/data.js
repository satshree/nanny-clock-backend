import { Router } from "express";
import {
  getData,
  getDataWithID,
  setData,
  updateData,
  removeData,
} from "../firebase/data";

// ROUTER INSTANCE
const router = Router();

// DATA ROUTES
router.route("/get/:id").get(async (req, res) => {
  const filterDate =
    req.query.firstDay ?? req.query.lastDay
      ? [req.query.firstDay, req.query.lastDay]
      : [];

  res.json(await getData(req.params.id, filterDate));
});

router.route("/add/:id").post(async (req, res) => {
  const data = {
    home: req.body.home,
    clockIn: req.body.clockIn,
    clockOut: req.body.clockOut,
    notes: req.body.notes,
  };

  res.json(await setData(data));
});

router
  .route("/set/:id")
  .post(async (req, res) => {
    const data = {
      notes: req.body.notes,
    };

    await updateData(req.params.id, data);
    const updatedData = getDataWithID(req.params.id);

    res.json(updatedData);
  })
  .delete(async (req, res) => {
    res.json(await removeData(req.params.id));
  });

export default router;
