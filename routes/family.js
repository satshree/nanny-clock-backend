import { Router } from "express";
import { getFamilyList, addFamily, removeFamily } from "../firebase/data";

// ROUTER INSTANCE
const router = Router();

// FAMILY ROUTES
router.route("/add").post(async (req, res) => {
  const home = req.body.home;
  const user = req.user;

  const newFamily = await addFamily(home, user);

  res.json({ message: "New family member added", data: newFamily });
});

router
  .route("/get/:id")
  .get(async (req, res) =>
    res.json(await getFamilyList(req.params.id, req.user))
  );

router.route("/delete/:id").delete(async (req, res) => {
  await removeFamily(req.params.id);

  res.json({ message: "Family member removed" });
});

export default router;
