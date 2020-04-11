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
    phone: {
      type: String,
      minlength: 8,
      maxlength: 20
    },
    facebook: {
      type: String,
    }
  },
  categories: [String],
  description: String,
  logo: {
    type: String,
    default: null
  },
  events: [{
    type: mongoose.ObjectId,
    ref: 'Event'
  }],

  // Private
  notifications: [{
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    } ,
    description: {
      type: String,
      maxlength: 200,
      default: 'No further description'
    },
    image: {
      type: String,
      maxlength: '200',
      default: '' // TODO: create 'default' folder on firebase storage and add default images for user avatar, notification, etc.
    },
    url: {
      type: String,
      maxlength: 100
    }
  }],
});

module.exports = mongoose.model('Org', orgSchema);
