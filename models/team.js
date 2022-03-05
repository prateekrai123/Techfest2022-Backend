const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      id: {
        type: ObjectId,
        ref: "User",
      },
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  leaderId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  totalTeamMember: {
    type: Number,
    required: true,
  },
  isParticipated: {
    type: Boolean,
    required: true,
    default: true,
  },
  event: {
    type: ObjectId,
    required: true,
    ref: "Event",
  },
});

module.exports = mongoose.model("Teams", TeamSchema);
