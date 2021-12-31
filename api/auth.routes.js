const express = require("express");
const {
  getErrorResponse,
  getSuccessResponse,
} = require("../common/responseFunctions");
const {
  compareBcrypt,
  genrateToken,
  encryptPassword,
} = require("../common/secretFunctions");
const { sendEmail } = require("../common/commonFunctions");
const userModel = require("./v1/models/user.model");

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
    .select("name username email roleRef")
    .exec()
    .then(
      async (success) => {
        if (!success) {
          return getErrorResponse(res, "User not found");
        }
        const randomPassword = Math.random().toString(36).slice(-8);
        const filter = { username: req.body.username };
        const update = { password: await encryptPassword(randomPassword) };
        await userModel.findOneAndUpdate(filter, update).then(
          async (success) => {
            await sendEmail(
              success.email,
              "Your new password for 360-Solutions",
              `<div><h3>Your New Password is below</h3><h1>${randomPassword}</h1></div>`
            ).then(
              (success) => {
                getSuccessResponse(res, { randomPassword, success });
              },
              (err) => {
                getErrorResponse(res, err);
              }
            );
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
