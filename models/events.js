const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  eventMode: {
    type: String,
    required: true,
    trim: true,
  },
  driveLink: {
    type: String,
    trim: true,
    required: true,
  },
  domain: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  studentCoordinator: [
    {
      type: ObjectId,
      required: true,
      ref: "Coordinator",
    },
  ],
});

module.exports = mongoose.model("Event", EventSchema);
