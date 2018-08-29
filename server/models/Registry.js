const mongoose = require('mongoose');

const registrySchema = new mongoose.Schema({

});

const Registry = mongoose.model('Registry', registrySchema);

module.exports = Registry;
