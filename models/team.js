const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  leaderId: {
    type: ObjectId,
    required: true,
  },
  event: {
    type: ObjectId,
    required: true,
  },
  members: [
    {
      email: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Teams", TeamSchema);
