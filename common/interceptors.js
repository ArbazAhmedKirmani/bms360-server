const express = require("express");
const { authErrorResponse } = require("./responseFunctions");
const { verifyToken } = require("./secretFunctions");
const interceptors = express();

// Include all interceptors here...

interceptors.use((req, res, next) => {
  // console.log(req.socket.remoteAddress);
  if (req.headers.authorization) {
    verifyToken(req.headers?.authorization.split(" ")[1].trim()).then(
      (success) => {
        if (req.method === "POST") {
          global.createdBy = "auth";
        } else if (req.method === "PUT") {
          global.updatedBy = "success";
        }
        next();
      },
      (error) => {
        authErrorResponse(res, error);
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
