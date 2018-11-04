const user = require("./user.route");
const login = require("./login.route");
const auth = require("./auth.route");
const tranfer = require("./transfer.route");
const consignment = require("./consignment.route");
const retreat = require("./retreat.route")

module.exports = {
  user,
  login,
  tranfer,
  auth,
  consignment,
  retreat
};