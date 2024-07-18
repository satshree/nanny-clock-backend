const moment = require("moment");
const { getData, getHome } = require("../firebase/data");

/**
 * INVOICE CONTROLLERS
 */

/**
 * Get invoice data of date range
 * @param {*} req
 * @param {*} res
 */
async function getInvoiceData(req, res) {
  const filterDate =
    req.query.firstDay ?? req.query.lastDay
      ? [req.query.firstDay, req.query.lastDay]
      : [];

  let invoiceItems = [];
  let totalHours = 0.0;
  let totalCost = 0.0;

  const home = await getHome(req.params.id);
  const allData = await getData(req.params.id, filterDate);

  allData.forEach((data) => {
    // CALCULATE TOTAL HOURS
    const totalHourDiff = moment
      .duration(moment(data.clockOut).diff(moment(data.clockIn))) // endtime.diff(starttime)
      .asHours();
    totalHours += totalHourDiff;

    // CALCULATE TOTAL COST
    const cost = totalHourDiff * home.hourlyRate;
    totalCost += cost;

    invoiceItems.push({
      day: moment(data.clockIn).format("dddd"),
      dateFormated: moment(data.clockIn).format("DD MMM, YYYY"),
      clockIn: moment(data.clockIn).format("hh:mm A"),
      clockOut: moment(data.clockOut).format("hh:mm A"),
      hours: totalHourDiff,
      cost,
    });
  });

  res.json({
    invoiceItems,
    totalHours,
    totalCost,
  });
}

module.exports = { getInvoiceData };
