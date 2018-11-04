const Router = require("express").Router;
const router = Router();
const userRoutes = require("./user");

router.use("/user", userRoutes.user);
router.use("/login", userRoutes.login);
router.use("/transfer", userRoutes.tranfer);
router.use("/auth", userRoutes.auth);
router.use("/consignment", userRoutes.consignment);
router.use("/retreat", userRoutes.retreat)

module.exports = router;