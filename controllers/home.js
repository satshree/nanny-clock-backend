const {
  getHomeList,
  getHome,
  addHome,
  setHome,
  removeHome,
} = require("../firebase/data");

async function fetchHome(req, res) {
  res.json(await getHome(req.params.id, req.user));
}

async function fetchHomeList(req, res) {
  res.json(await getHomeList(req.user));
}

async function createHome(req, res) {
  const homeData = {
    name: req.body.name,
    description: req.body.description,
    hourlyRate: parseInt(req.body.hourlyRate),
  };

  const newHome = await addHome(homeData, req.user);

  res.json({ message: "New home added", data: newHome });
}

async function updateHome(req, res) {
  const homeData = {
    name: req.body.name,
    description: req.body.description,
    hourlyRate: parseInt(req.body.hourlyRate),
  };

  await setHome(req.params.id, homeData);
  const updatedHome = await getHome(req.params.id, req.user);

  res.json({ message: "Home information updated", data: updatedHome });
}

async function deleteHome(req, res) {
  await removeHome(req.params.id, req.user);
  res.json({ message: "Home deleted" });
}

module.exports = {
  fetchHome,
  fetchHomeList,
  createHome,
  updateHome,
  deleteHome,
};
