const {
  getSettings,
  setSettings,
  removeSettings,
} = require("../firebase/data");

/**
 * SETTINGS CONTROLLERS
 */

/**
 * Get settings
 * @param {*} req
 * @param {*} res
 */
async function getHomeSettings(req, res) {
  res.json(getSettings(req.params.id));
}

/**
 * Update settings
 * @param {*} req
 * @param {*} res
 */
async function setHomeSettings(req, res) {
  const data = {
    autoClockEnd: req.body.autoClockEnd,
    autoClockStart: req.body.autoClockStart,
    autoDailyClock: req.body.autoDailyClock,
  };

  await setSettings(req.params.id, data);

  res.json({
    message: "Settings updated. Changes will be reflected by midnight.",
  });
}

module.exports = {
  getHomeSettings,
  setHomeSettings,
};
