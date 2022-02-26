const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshop = new Schema({
  workshopName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  wsDesc: {
    type: String,
    maxlength: 2000,
    trim: true,
  },
  hostName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  hostDesc: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  studentCoordinator: [{ type: Schema.Types.ObjectId }],
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("Workshop", workshop);
