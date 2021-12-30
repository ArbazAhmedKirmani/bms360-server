const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true, trim: true, unique: true },
    isActive: { type: Boolean, required: true },
    createdBy: { type: String, required: false, default: global.createdBy },
    updatedBy: { type: String, required: false, default: global.updatedBy },
  },
  { timestamps: true }
);

const rolesModel = mongoose.model("roles", rolesSchema);

module.exports = rolesModel;
