const mongoose = require("mongoose");

const menusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    url: {
      type: String,
      required: false,
      default: null,
      lowercase: true,
      trim: true,
    },
    icon: { type: String, required: false, default: null, trim: true },
    isParent: { type: Boolean, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: "menus",
    },
    isChild: { type: Boolean, required: true },
    sequence: { type: Number, required: true, trim: true },
    isActive: { type: Boolean, required: true, default: false },
    createdBy: { type: String, required: false, default: "null" },
    updatedBy: { type: String, required: false, default: "null" },
  },
  { timestamps: true }
);

const menusModel = mongoose.model("menus", menusSchema);

module.exports = menusModel;
