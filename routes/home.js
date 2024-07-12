const express = require("express");
const firestoreData = require("../firebase/data");

// ROUTER INSTANCE
const router = express.Router();

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

    const newHome = await firestoreData.addHome(homeData, req.user);

    res.json({ message: "New home added", data: newHome });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    res.json(await firestoreData.getHome(req.params.id, req.user));
  })
  .put(async (req, res) => {
    const homeData = {
      name: req.body.name,
      description: req.body.description,
      hourlyRate: parseInt(req.body.hourlyRate),
    };

    await firestoreData.setHome(req.params.id, homeData);
    const updatedHome = await firestoreData.getHome(req.params.id, req.user);

    res.json({ message: "Home information updated", data: updatedHome });
  })
  .delete(async (req, res) => {
    await firestoreData.removeHome(req.params.id, req.user);
    res.json({ message: "Home deleted" });
  });

module.exports = router;
