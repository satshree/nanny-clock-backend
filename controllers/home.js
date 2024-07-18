const {
  getHomeList,
  getHome,
  addHome,
  setHome,
  removeHome,
} = require("../firebase/data");

/**
 * HOME CONTROLLERS
 */

/**
 * Return home with home ID
 * @param {*} req
 * @param {*} res
 */
async function fetchHome(req, res) {
  res.json(await getHome(req.params.id));
}

/**
 * Return list of home of given user
 * @param {*} req
 * @param {*} res
 */
async function fetchHomeList(req, res) {
  res.json(await getHomeList(req.user));
}

/**
 * Create new home
 * @param {*} req
 * @param {*} res
 */
async function createHome(req, res) {
  const homeData = {
    name: req.body.name,
    description: req.body.description,
    hourlyRate: parseInt(req.body.hourlyRate),
  };

  const newHome = await addHome(homeData, req.user);

  res.json({ message: "New home added", data: newHome });
}

/**
 * Update home information
 * @param {*} req
 * @param {*} res
 */
async function updateHome(req, res) {
  const homeData = {
    name: req.body.name,
    description: req.body.description,
    hourlyRate: parseInt(req.body.hourlyRate),
  };

  await setHome(req.params.id, homeData);
  const updatedHome = await getHome(req.params.id);

  res.json({ message: "Home information updated", data: updatedHome });
}

/**
 * Delete home
 * @param {*} req
 * @param {*} res
 */
async function deleteHome(req, res) {
  await removeHome(req.params.id);
  res.json({ message: "Home deleted" });
}

module.exports = {
  fetchHome,
  fetchHomeList,
  createHome,
  updateHome,
  deleteHome,
};
