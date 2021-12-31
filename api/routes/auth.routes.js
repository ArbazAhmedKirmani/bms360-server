const express = require("express");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../../common/responseFunctions");
const {
  compareBcrypt,
  genrateToken,
  hashPassword,
} = require("../../common/secretFunctions");
const userModel = require("../models/user.model");

const authRoutes = express.Router();

authRoutes.post("/login", async (req, res) => {
  await userModel
    .findOne({
      username: req.body.username,
      isActive: true,
    })
    .select("name username password")
    .exec()
    .then(async (result, error) => {
      if (error) {
        getErrorResponse(res, error);
      }
      await compareBcrypt(req.body.password, result.password).then(
        (resolve) => {
          if (!resolve) {
            return getErrorResponse(res, "Incorrect Password");
          }
          const token = genrateToken(result);
          getSuccessResponse(res, { token, result });
        },
        (err) => {
          getErrorResponse(res, err);
        }
      );
    });
});

authRoutes.post("/forgetPassword", async (req, res) => {
  await userModel
    .findOne({
      username: req.body.username,
      isActive: true,
    })
    .select("name username roleRef")
    .exec()
    .then(
      async (success) => {
        if (!success) {
          return getErrorResponse(res, "User not found");
        }
        const randomPassword = Math.random().toString(36).slice(-9);
        const filter = { username: req.body.username };
        const update = { password: await hashPassword(randomPassword) };
        await userModel.findOneAndUpdate(filter, update).then(
          (success) => {
            getSuccessResponse(res, randomPassword);
          },
          (error) => {
            getErrorResponse(res, error);
          }
        );
      },
      (error) => {
        getErrorResponse(res, error);
      }
    );
});

module.exports = authRoutes;
