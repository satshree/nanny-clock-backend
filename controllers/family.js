const { getFamilyList, addFamily, removeFamily } = require("../firebase/data");

/**
 * FAMILY CONTROLLERS
 */

/**
 * Return list of family
 * @param {*} req
 * @param {*} res
 */
async function getFamily(req, res) {
  res.json(await getFamilyList(req.params.id));
}

/**
 * Add to family list
 * @param {*} req
 * @param {*} res
 */
async function addToFamily(req, res) {
  const home = req.body.home;
  const user = req.user;

  const newFamily = await addFamily(home, user);

  res.json({ message: "New family member added", data: newFamily });
}

/**
 * Remove a family member
 * @param {*} req
 * @param {*} res
 */
async function deleteFamily(req, res) {
  await removeFamily(req.params.id);

  res.json({ message: "Family member removed" });
}

module.exports = { getFamily, addToFamily, deleteFamily };
