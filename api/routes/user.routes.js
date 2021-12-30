const express = require("express");
const {
  getErrorResponse,
  getSuccessResponse,
} = require("../../common/responseFunctions");
const userModel = require("../models/user.model");
const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  await userModel
    .find()
    .select("name username isActive createdBy employeeRef")
    .exec()
    .then(
      (result) => {
        getSuccessResponse(res, result);
      },
      (error) => {
        getErrorResponse(res, error);
      }
    );
});

userRoutes.post("/createUser");

module.exports = userRoutes;
