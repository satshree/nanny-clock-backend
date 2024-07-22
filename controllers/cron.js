const moment = require("moment");
const admin = require("../firebase/admin");
const { setData } = require("../firebase/data");

/**
 * CRON CONTROLLERS
 */

const db = admin.firestore();

async function autoClockHomes() {
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

  allSettings.forEach((settings) => {
    if (
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

        setData(data);
      } catch (err) {
        console.log("ERR", err);
      }
    }
  });
}

module.exports = { autoClockHomes };
