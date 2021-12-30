const express = require("express");
const interceptors = express();


// Include all interceptors here...

interceptors.use((req, res, next) => {
    console.log('this is me');
  next();
})

module.exports = interceptors;