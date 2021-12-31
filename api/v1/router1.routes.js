const express = require("express");
const rolesRoute = require("./routes/roles.routes");
const userRoutes = require("./routes/user.routes");

const router1Routes = express.Router();

router1Routes.use("/user", userRoutes);
router1Routes.use("/employee", userRoutes);
router1Routes.use("/role", rolesRoute);

module.exports = router1Routes;
