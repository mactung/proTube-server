const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  content: String,
  location: String,
  startDate: Date,
  dueDate: Date,
  org: {
    type: mongoose.ObjectId,
    ref: 'Org'
  }
});

module.exports = mongoose.model('Event', eventSchema);
