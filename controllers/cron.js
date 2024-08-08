const moment = require("moment");
const admin = require("../firebase/admin");
const { setData } = require("../firebase/data");

/**
 * CRON CONTROLLERS
 */

const db = admin.firestore();

async function autoClockHomes(req, res) {
  console.log("HERE AT CRON FUNCTION");

  const allSettings = await db.collection("homeSettings").get();

  const currentDate = moment().format("YYYY-MM-DD");
  const mapDays = {
    0: "su",
    1: "mo",
    2: "tu",
    3: "we",
    4: "th",
    5: "fr",
    6: "sa",
  };
  const today = mapDays[moment().day()];

  allSettings.forEach(async (s) => {
    const settings = s.data();

    if (
      settings.autoDailyClock !== undefined &&
      settings.autoDailyClock.length !== 0 &&
      settings.autoDailyClock.indexOf(today) !== -1
    ) {
      try {
        const start = moment(
          `${currentDate} ${settings.autoClockStart}`,
          "YYYY-MM-DD hh:mm A"
        );
        const end = moment(
          `${currentDate} ${settings.autoClockEnd}`,
          "YYYY-MM-DD hh:mm A"
        );

        const data = {
          home: settings.home,
          clockIn: start,
          clockOut: end,
        };

        try {
          await setData(data);
        } catch (error) {
          console.log("ERROR");
          console.log("Home", settings.home);
          console.log(error);
        }
      } catch (err) {
        console.log("ERR", err);
      }
    }
  });

  res.send(`<h1>NANNY CLOCK GLOBAL CRON TASK.</h1>
    <br />
    <small>Nothing major stuffs behind this endpoint.</small>
    `);
}

module.exports = { autoClockHomes };
