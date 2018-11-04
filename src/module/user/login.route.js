const Router = require("express").Router;
const userController = require("./user.controller");

const router = Router();
router.route("/").post((...args) => userController.login(...args));
module.exports = router;