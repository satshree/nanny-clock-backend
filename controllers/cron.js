const { autoClockHomesUtility } = require("../utilities");

/**
 * CRON CONTROLLERS
 */

async function autoClockHomes(req, res) {
  await autoClockHomesUtility();

  res.send(`<h1>NANNY CLOCK GLOBAL CRON TASK.</h1>
    <br />
    <small>Nothing major stuffs behind this endpoint.</small>
    `);
}

module.exports = { autoClockHomes };
