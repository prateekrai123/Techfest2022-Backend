const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
  },
  dob: {
    type: Date,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    maxlength: 13,
    trim: true,
  },
  whatsappPhoneNumber: {
    type: String,
    maxlength: 15,
    trim: true,
  },
  telegramPhoneNumber: {
    type: String,
    maxlength: 15,
    trim: true,
  },
  collegeName: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  regNo: {
    type: String,
    maxlength: 10,
    trim: true,
  },
  instituteAddress: {
    type: String,
    maxlength: 200,
    trim: true,
  },
  course: {
    //Name of course like B.E., B.Tech etc..
    type: String,
    maxlength: 100,
    trim: true,
  },
  referralCode: {
    type: String,
    maxLength: 50,
    trim: true,
  },
  referrals: {
    type: Number,
    default: 0,
  },
  yearOfStudy: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
  },
  eventsParticipated: [
    {
      type: ObjectId,
      ref: "Event",
    },
  ],
  workshopsParticipated: [
    {
      type: ObjectId,
      ref: "Workshop",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
