const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  listingHash: String,
  challengeID: Number,
  data: String,
  commitEndDate: Number,
  revealEndDate: Number,
  challenger: String,
  resolved: Boolean,
  isSucceed: Boolean,
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
