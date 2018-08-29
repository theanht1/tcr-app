const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  listingHash: {
    type: String,
    unique: true,
    required: true,
  },
  deposit: Number,
  appEndDate: Number,
  data: String,
  applicant: String,
  isWhitelisted: Boolean,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
