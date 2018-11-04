const Router = require("express").Router;
const transactionsController = require("./transactions.controller");

const router = Router();
router.route("/").put((...args) => transactionsController.consignment(...args));
module.exports = router;