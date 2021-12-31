const express = require("express");
const { authErrorResponse } = require("./responseFunctions");
const { verifyToken } = require("./secretFunctions");
const interceptors = express();

// Include all interceptors here...

interceptors.use((req, res, next) => {
  // console.log(req.socket.remoteAddress);

  const token = req.headers.authorization.split("Bearer ")[1].trim();
  verifyToken(token).then(
    (success) => {
      if (req.method === "POST") {
        global.createdBy = "auth";
      } else if (req.method === "PUT") {
        global.updatedBy = "success";
      }
    );
  } else authErrorResponse(res, { message: "Auth Signature is Missing" });
});

interceptors.use((req, res, next) => {
  next();
  delete global.createdBy;
  delete global.updatedBy;
});

module.exports = interceptors;
