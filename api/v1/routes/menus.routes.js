const express = require("express");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../../../common/responseFunctions");
const menusModel = require("../models/menus.model");
const menusRoutes = express.Router();

menusRoutes.get("/", async (req, res) => {
  await menusModel
    .find()
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

menusRoutes.post("/", async (req, res) => {
  await menusModel.create(req.body).then(
    (success) => {
      console.log(success);
      getSuccessResponse(res, success);
    },
    (error) => {
      getErrorResponse(res, error);
    }
  );
});

module.exports = menusRoutes;
