const Router = require("express").Router;
const userController = require("./user.controller");
let util = require("./../../utils");

const router = Router();

router
  .route("/")
  .post((...args) => userController.post(...args))
  .get(util.verifyAdmin, util.verifyAuth, (...args) => userController.get(...args));

router.route("/:cc")
  .get((...args) => userController.getOne(...args));

module.exports = router;