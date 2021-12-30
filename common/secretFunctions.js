const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const genrateToken = (user) =>
  jwt.sign(
    {
      data: {
        id: user._id,
        username: user.username,
        dbName: process.env.DB_DATABASE,
      },
    },
    process.env.PRIVATE_KEY,
    {
      expiresIn: process.env.EXP_IN,
    }
  );

const compareBcrypt = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PRIVATE_KEY, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });

module.exports = { genrateToken, compareBcrypt, verifyToken };
