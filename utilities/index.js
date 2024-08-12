const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const admin = require("../firebase/admin");
const { setData } = require("../firebase/data");
const { sendMailAsHTML } = require("./email");

/**
 * UTILITIES
 */

const db = admin.firestore();

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
  let emailHtmlStatus = "";

  for (const s of allSettings.docs) {
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
        ).tz("America/Chicago");
        const end = moment(
          `${currentDate} ${settings.autoClockEnd}`,
          "YYYY-MM-DD hh:mm A"
        ).tz("America/Chicago");

        const data = {
          home: settings.home,
          clockIn: start,
          clockOut: end,
        };

        logOutput("********");
        logOutput(`Clock data => ${JSON.stringify(data, undefined, 2)}`);

        try {
          const response = await setData(data);
          counter++;
          emailHtmlStatus += `<tr>
            <td>${counter}</td>
            <td>${data.home}</td>
            <td>${JSON.stringify(settings.autoDailyClock)}</td>
            <td>${moment(data.clockIn).format("hh:mm A")}</td>
            <td>${moment(data.clockOut).format("hh:mm A")}</td>
            <td><small><pre>${JSON.stringify(
              response,
              undefined,
              2
            )}</pre></small></td>
          </tr>`;
        } catch (error) {
          console.log("ERROR");
          console.log("Home", settings.home);
          console.log(error);
        }
      } catch (err) {
        console.log("ERR", err);
      }
    }
  }

  logOutput("********");
  logOutput(`Total auto clocked => ${counter}`);
  logOutput("********");

  const htmlContent = await fs.promises.readFile(
    path.join(__dirname, "..", "templates", "cronAutoClockStatusEmail.html"), // ./../templates/cronAutoClockStatusEmail.html
    "utf-8"
  );
  const htmlToSend = htmlContent
    .toString()
    .replace(/{{date}}/g, `${currentDate}, ${moment().format("hh:mm A")}`)
    .replace(/{{totalAutoClockedIn}}/g, counter)
    .replace(/{{clockedList}}/g, emailHtmlStatus);

  await sendMailAsHTML(
    "satshree.shrestha@gmail.com",
    "[Nanny Clock] Daily auto clock in cron status",
    htmlToSend
  );

  logOutput("Email Sent");
  logOutput("********");
}

module.exports = { sleep, autoClockHomesUtility };
