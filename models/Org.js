const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Org', orgSchema);
