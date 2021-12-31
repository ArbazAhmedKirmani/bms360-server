const express = require("express");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../../common/responseFunctions");
const rolesModel = require("../models/roles.model");
const rolesRoute = express.Router();

rolesRoute.get("/get", async (req, res) => {
  await rolesModel
    .find()
    .select()
    .populate()
    .exec()
    .then(
      (success) => {
        getSuccessResponse(res, success);
      },
      (error) => {
        getErrorResponse(res, error);
      }
    );
});

rolesRoute.post("/create", async (req, res) => {
  await rolesModel.create(req.body).then(
    (success) => {
      getSuccessResponse(res, success);
    },
    (error) => {
      getErrorResponse(res, error);
    }
  );
});

rolesRoute.put("/:roleId", async (req, res) => {
  await rolesModel.updateOne({ _id: req.params.roleId }, req.body).then(
    (success) => {
      getSuccessResponse(res, success);
    },
    (error) => {
      getErrorResponse(res, error);
    }
  );
});

rolesRoute.delete("/:roleId", async (req, res) => {
  await rolesModel.deleteOne({ _id: req.params.roleId }).then(
    (success) => {
      getSuccessResponse(res, success);
    },
    (error) => {
      getErrorResponse(res, error);
    }
  );
});

module.exports = rolesRoute;
