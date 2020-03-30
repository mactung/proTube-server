const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  dob: String,
  ava: String,
  bio: String,
});

module.exports = mongoose.model('User', userSchema);
