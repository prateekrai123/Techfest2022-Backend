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
  photo: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  studentCoordinator: {
    type: ObjectId,
    // required: true,
    ref: "Coordinator",
  },
});

module.exports = mongoose.model("Event", EventSchema);
