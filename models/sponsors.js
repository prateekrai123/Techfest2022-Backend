const mongoose = require("mongoose");

const SponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sponsor", SponsorSchema);
