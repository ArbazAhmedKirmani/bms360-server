const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxLength: 40 },
  username: { type: String, required: true, trim: true, maxLength: 12 },
  password: { type: String, required: true, trim: true },
  isActive: { type: Boolean, required: true, },
  employeeRef: { type: mongoose.Schema.Types.ObjectId, required: false, default: null, trim: true, ref: 'employees' },
  createdBy: { type: String, required: false },
  updatedBy: { type: String, required: false },
},{ timestamps: true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;