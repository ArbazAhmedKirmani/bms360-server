const express = require("express");
const {
  getSuccessResponse,
  getErrorResponse,
} = require("../../common/responseFunctions");
const { compareBcrypt, genrateToken } = require("../../common/secretFunctions");
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

// authRoutes.post("/signup", async (req, res) => {
//   await userModel
//     .create({
//       name: req.body.name,
//       username: req.body.username,
//       password: req.body.password,
//       isActive: true,
//     })
//     .select("name username password")
//     .exec()
//     .then(async (result, error) => {
//       if (error) {
//         getErrorResponse(res, error);
//       }
//       await compareBcrypt(req.body.password, result.password).then(
//         (resolve) => {
//           if (!resolve) {
//             return getErrorResponse(res, "Incorrect Password");
//           }
//           const token = genrateToken(result);
//           getSuccessResponse(res, { token, result });
//         },
//         (err) => {
//           getErrorResponse(res, err);
//         }
//       );
//     });
// });

module.exports = authRoutes;
