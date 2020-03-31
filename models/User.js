const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  dob: Date,
  ava: String,
  bio: String,
});

module.exports = mongoose.model('User', userSchema);
