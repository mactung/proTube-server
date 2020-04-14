const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
  // Public
  name: String,
  contact: {
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 40
    },
    phoneNumber: {
      type: String,
      minlength: 8,
      maxlength: 20,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    }
  },
  categories: [String],
  description: {
    type: String,
    required: true,
    default: 'Nothing here yet!',
    minlength: 2,
    maxlength: 2000
  },
  logo: {
    type: String,
    default: null
  },
  events: [{
    type: mongoose.ObjectId,
    ref: 'Event'
  }],
  followers: [{
    type: mongoose.ObjectId,
    ref: 'User'
  }],

  // Private
  notifications: [{
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 200,
      default: 'No further description'
    },
    image: {
      type: String,
      maxlength: '200',
      default: null
    },
    url: {
      type: String,
      maxlength: 100
    }
  }],
});

module.exports = mongoose.model('Org', orgSchema);
