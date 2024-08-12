const moment = require("moment");
const admin = require("../firebase/admin");
const { setData } = require("../firebase/data");

/**
 * CRON CONTROLLERS
 */

const db = admin.firestore();

async function autoClockHomesUtility(verbose = true) {
  function logOutput(message) {
    if (verbose) console.log(message);
  }
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

  logOutput("********");
  logOutput(`Auto clocking homes for ${currentDate}`);
  logOutput(`Today => ${today}`);

  let counter = 0;

  allSettings.forEach(async (s) => {
    const settings = s.data();

    logOutput("********");
    logOutput(`Clocking for home => ${settings.home}`);
    logOutput(`Auto clock settings => ${settings.autoDailyClock}`);

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

        logOutput("********");
        logOutput(`Clock data => ${JSON.stringify(data, undefined, 2)}`);

        try {
          await setData(data);
          counter++;
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

  logOutput("********");
  logOutput(`Total auto clocked => ${counter}`);
  logOutput("********");
}

module.exports = { autoClockHomesUtility };
