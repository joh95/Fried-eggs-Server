const Router = require("express").Router;
const transactionsController = require("./transactions.controller");

const router = Router();
router.route("/").put((...args) => transactionsController.retreat(...args));
module.exports = router;
