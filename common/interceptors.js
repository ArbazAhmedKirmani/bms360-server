const express = require("express");
const interceptors = express();

// Include all interceptors here...

interceptors.use((req, res, next) => {
  // console.log(req.socket.remoteAddress);
  if (req.method === "POST") {
    global.createdBy = "auth";
  } else if (req.method === "PUT") {
    global.updatedBy = "success";
  }
  next();
});

interceptors.use((req, res, next) => {
  next();
  delete global.createdBy;
  delete global.updatedBy;
});

module.exports = interceptors;
