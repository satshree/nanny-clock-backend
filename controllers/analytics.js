const moment = require("moment");
const { getData, getHome } = require("../firebase/data");

/**
 * ANALYTICS CONTROLLERS
 */

/**
 * Get total days, hours and cost
 * @param {*} req
 * @param {*} res
 */
async function getTotalDataNumbers(req, res) {
  let totalHours = 0.0;
  let totalCost = 0.0;
  let totalDays = 0;

  const homeID = req.params.id;

  const home = await getHome(homeID);
  const allData = await getData(homeID);

  allData.forEach((data) => {
    // CALCULATE TOTAL HOURS
    const totalHourDiff = moment
      .duration(moment(data.clockOut).diff(moment(data.clockIn))) // endtime.diff(starttime)
      .asHours();

    totalHours += totalHourDiff;

    // CALCULATE TOTAL COST
    totalCost += totalHourDiff * home.hourlyRate;

    // CALCULATE TOTAL DAYS
    totalDays += 1;
  });

  res.json({
    totalHours,
    totalCost,
    totalDays,
  });
}

/**
 * Get monthly total days, hours and cost
 * @param {*} req
 * @param {*} res
 */
async function getMonthlyDataNumbers(req, res) {
  let totalHours = 0.0;
  let totalCost = 0.0;
  let totalDays = 0;

  let monthlyData = {};

  const homeID = req.params.id;

  const home = await getHome(homeID);
  const allData = await getData(homeID);

  // SET UP DATA
  let prevData = allData[0];

  allData.forEach((data) => {
    if (moment(prevData.clockIn).month() < moment(data.clockIn).month()) {
      // SET PREVIOUS MONTH DATA
      const prevMonth = moment(prevData.clockIn).format("YYYY-MM");
      monthlyData[prevMonth] = { totalHours, totalCost, totalDays };

      // RESET DATA
      totalHours = 0.0;
      totalCost = 0.0;
      totalDays = 0;
    }

    // CALCULATE TOTAL HOURS
    const totalHourDiff = moment
      .duration(moment(data.clockOut).diff(moment(data.clockIn))) // endtime.diff(starttime)
      .asHours();

    totalHours += totalHourDiff;

    // CALCULATE TOTAL COST
    totalCost += totalHourDiff * home.hourlyRate;

    // CALCULATE TOTAL DAYS
    totalDays += 1;

    // SET CURRENT DATA AS PREVIOUS DATA
    prevData = data;
  });

  res.json(monthlyData);
}

/**
 * Get daily total hours and cost
 * @param {*} req
 * @param {*} res
 */
async function getDailyDataNumbers(req, res) {
  let dailyData = {};

  const homeID = req.params.id;

  const home = await getHome(homeID);
  const allData = await getData(homeID);

  allData.forEach((data) => {
    const totalHour = moment
      .duration(moment(data.clockOut).diff(moment(data.clockIn))) // endtime.diff(starttime)
      .asHours();

    dailyData[moment(data.clockIn).format("YYYY-MM-DD")] = {
      totalHour,
      totalCost: totalHour * home.hourlyRate,
    };
  });

  res.json(dailyData);
}

module.exports = {
  getTotalDataNumbers,
  getMonthlyDataNumbers,
  getDailyDataNumbers,
};
