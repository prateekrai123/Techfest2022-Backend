const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshop = new Schema({
  workshopName: {
    type: String,
    maxlength: 32,
    trim: true,
    required: true,
  },
  wsDesc: {
    type: String,
    maxlength: 2000,
    trim: true,
    required: true,
  },
  hostName: {
    type: String,
    maxlength: 32,
  },
  wDriveLink: {
    type: String,
    maxlength: 200,
  },
  hostDesc: {
    type: String,
    maxlength: 200,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  studentCoordinator: [{ type: Schema.Types.ObjectId }],
  facultyCoordinator: [{ type: Schema.Types.ObjectId }],
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("Workshop", workshop);
