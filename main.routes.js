const express = require("express");
const userRoutes = require("./api/routes/user.routes");

const mainRoutes = express();

mainRoutes.use("/user", userRoutes);
mainRoutes.use("/employee", userRoutes);

module.exports = mainRoutes;
