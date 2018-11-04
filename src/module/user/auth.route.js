const Router = require("express").Router;
const userController = require("./user.controller");
let util = require("../../utils");
const router = Router();
router
  .route("/")
  .post(util.verifyCode, (...args) => userController.auth(...args));
module.exports = router;