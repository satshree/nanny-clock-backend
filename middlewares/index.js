const { verifyToken } = require("./authentication");
const { checkAuthenticityWithHome } = require("./authenticity");

module.exports = { verifyToken, checkAuthenticityWithHome };
