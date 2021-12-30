const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 40 },
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 12,
      unique: true,
    },
    password: { type: String, required: true, trim: true },
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
      ref: "roles",
    },
    createdBy: { type: String, required: false, default: global.createdBy },
    updatedBy: { type: String, required: false, default: global.updatedBy },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
