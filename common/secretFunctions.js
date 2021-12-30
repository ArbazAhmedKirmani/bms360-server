const bcrypt = require("bcrypt");

const compareBcrypt = (password, hashPassword) => {
  return new Promise((resolve, reject) => { 
    bcrypt.compare(password, hashPassword, function(err, result) {
      if(err){
          return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = compareBcrypt;