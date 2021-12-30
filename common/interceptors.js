const express = require("express");
const interceptors = express();

interceptors.use((req, res, next) => {
  next();
})

module.exports = interceptors;