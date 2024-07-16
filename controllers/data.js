const {
  getData,
  getDataWithID,
  setData,
  updateData,
  removeData,
} = require("../firebase/data");

/**
 * DATA CONTROLLERS
 * */

/**
 * Return all clock in - clock out data
 * @param {*} req
 * @param {*} res
 */
async function getAllData(req, res) {
  const filterDate =
    req.query.firstDay ?? req.query.lastDay
      ? [req.query.firstDay, req.query.lastDay]
      : [];

  res.json(await getData(req.params.id, filterDate));
}

/**
 * Create clock in - clock out data
 * @param {*} req
 * @param {*} res
 */
async function setData(req, res) {
  const data = {
    home: req.body.home,
    clockIn: req.body.clockIn,
    clockOut: req.body.clockOut,
    notes: req.body.notes,
  };

  res.json(await setData(data));
}

/**
 * Update data
 * @param {*} req
 * @param {*} res
 */
async function updateData(req, res) {
  const data = {
    notes: req.body.notes,
  };

  await updateData(req.params.id, data);
  const updatedData = getDataWithID(req.params.id);

  res.json(updatedData);
}

/**
 * Remove data
 * @param {*} req
 * @param {*} res
 */
async function deleteData(req, res) {
  res.json(await removeData(req.params.id));
}

module.exports = { getAllData, setData, updateData, deleteData };
