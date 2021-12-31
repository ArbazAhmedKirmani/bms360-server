const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [40, "Name Not more than 40 characters"],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: [12, "Username Not more than 40 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "Password must contain atleast 8 characters"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    isActive: { type: Boolean, required: true },
    employeeRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: "employees",
    },
    roleRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: "roles",
    },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
