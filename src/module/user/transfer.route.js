const Router = require("express").Router;
const transactionsController = require("./transactions.controller");

const router = Router();
router.route("/").put((...args) => transactionsController.transfer(...args));
module.exports = router;