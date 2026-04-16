//init
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 6,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      max: 256,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema, "users");
