import { Router } from "express";
import {
  getHomeList,
  addHome,
  getHome,
  setHome,
  removeHome,
} from "../firebase/data";

// ROUTER INSTANCE
const router = Router();

// HOME ROUTE
router
  .route("/")
  .get(async (req, res) => res.json(await getHomeList(req.user)))
  .post(async (req, res) => {
    const homeData = {
      name: req.body.name,
      description: req.body.description,
      hourlyRate: parseInt(req.body.hourlyRate),
    };

    const newHome = await addHome(homeData, req.user);

    res.json({ message: "New home added", data: newHome });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    res.json(await getHome(req.params.id, req.user));
  })
  .put(async (req, res) => {
    const homeData = {
      name: req.body.name,
      description: req.body.description,
      hourlyRate: parseInt(req.body.hourlyRate),
    };

    await setHome(req.params.id, homeData);
    const updatedHome = await getHome(req.params.id, req.user);

    res.json({ message: "Home information updated", data: updatedHome });
  })
  .delete(async (req, res) => {
    await removeHome(req.params.id, req.user);
    res.json({ message: "Home deleted" });
  });

export default router;
