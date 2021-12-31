require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Importing Routes
const interceptors = require("./common/interceptors");
const authRoutes = require("./api/auth.routes");
const router1Routes = require("./api/v1/router1.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));

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

// app.use(interceptors);

app.use("/auth", authRoutes); // public routes
app.use("/api", interceptors); // protected routes
app.use("/api/v1", router1Routes); // protected routes

// Listening to Port
app.listen(process.env.PORT || 4250, () => {
  console.log("Connected to port " + process.env.PORT);
});
