require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importing Routes
const authRoutes = require("./api/routes/auth.routes");
const mainRoutes = require("./main.routes");
const interceptors = require("./common/interceptors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

app.use(interceptors);

app.use("/auth", authRoutes); // public routes
app.use("/api", mainRoutes); // protected routes

// Listening to Port
app.listen(process.env.PORT || 4250, () => {
  console.log("Connected to port " + process.env.PORT);
});
