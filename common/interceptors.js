const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { authErrorResponse } = require("./responseFunctions");
const { verifyToken } = require("./secretFunctions");
const interceptors = express();

// Include all interceptors here...

interceptors.use((req, res, next) => {
  if (req.headers.authorization) {
    verifyToken(req.headers?.authorization.split(" ")[1].trim()).then(
      (success) => {
        console.log("success", success);
        if (req.method === "POST") {
          req.body.createdBy = success.data.id;
        } else if (req.method === "PUT") {
          req.body.updatedBy = success.data.id;
        }
        next();
      },
      (error) => {
        return authErrorResponse(res, error);
      }
    );
  } else
    return authErrorResponse(res, { message: "Auth Signature is Missing" });
});

module.exports = interceptors;
