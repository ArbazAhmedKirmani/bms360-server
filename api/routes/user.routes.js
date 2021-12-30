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
    .select("name username isActive createdBy employeeRef roleRef")
    .populate("roleRef")
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

userRoutes.post("/create", async (req, res) => {
  await userModel
    .create({
      name: req.body?.name,
      username: req.body?.username,
      password: req.body?.password,
      isActive: req.body?.isActive,
      employeeRef: req.body?.employeeID,
      roleRef: req.body?.roleID,
    })
    .then(
      (success) => {
        getSuccessResponse(res, success);
      },
      (error) => {
        getErrorResponse(res, error);
      }
    );
});

userRoutes.put("/:userId", async (req, res) => {
  await userModel
    .updateOne(
      { _id: req.params.userId },
      {
        name: req.body?.name,
        isActive: req.body?.isActive,
        employeeRef: req.body?.employeeID,
        roleRef: req.body?.roleID,
      }
    )
    .then(
      (success) => {
        getSuccessResponse(res, success);
      },
      (error) => {
        getErrorResponse(res, error);
      }
    );
});

userRoutes.delete("/:userId", async (req, res) => {
  await userModel.deleteOne({ _id: req.params.userId }).then(
    (success) => {
      getSuccessResponse(res, success);
    },
    (error) => {
      getErrorResponse(res, error);
    }
  );
});

module.exports = userRoutes;
