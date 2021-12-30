const express = require("express");
const jsonwebtoken = require('jsonwebtoken');
const { getSuccessResponse, getErrorResponse } = require("../../common/responseFunctions");
const compareBcrypt = require('../../common/secretFunctions');
const userModel = require("../models/user.model");

const authRoutes = express.Router();

authRoutes.post("/login", async (req, res) => {
  await userModel.findOne({
    username: req.body.username,
    isActive: true
  })
    .select('name username password')
    .exec()
    .then(async (result, error) => {
      if (error) {
        console.log('error', error);
        getErrorResponse(res, error)
      }
      console.log('result', result);
      await compareBcrypt(req.body.password, result.password)
        .then((resolve) => {
          if (!resolve) {
            return getErrorResponse(res, 'Incorrect Password')
          }
          const token = jsonwebtoken.sign({
            username: result.username,
            companyDB: process.env.DB_DATABASE
          }, process.env.PRIVATE_KEY, {
            expiresIn: '1d'
          })
          getSuccessResponse(res, { token: token, data: result })
        }, (err) => {
          getErrorResponse(res, err)
        })
    })
})

module.exports = authRoutes;