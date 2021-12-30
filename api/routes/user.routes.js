const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
if (err){
  console.log(err);
  res.status(500).send()
}
  res.status(200).send('HELLO')
})

module.exports = userRoutes;