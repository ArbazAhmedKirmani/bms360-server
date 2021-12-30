const express = require("express");
const rolesRoute = require("./api/routes/roles.routes");
const userRoutes = require("./api/routes/user.routes");

const mainRoutes = express();

mainRoutes.use("/user", userRoutes);
mainRoutes.use("/employee", userRoutes);
mainRoutes.use("/role", rolesRoute);

module.exports = mainRoutes;
