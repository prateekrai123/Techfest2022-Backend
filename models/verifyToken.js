const mongoose = require("mongoose");

const verifyToken = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 60000,
  },
});

module.exports = new mongoose.model("verifyToken", verifyToken);
