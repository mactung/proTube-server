const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultCategories = [
  'a',
  'b',
  'c',
  'd'
].map(s => s.toLowerCase());

const userSchema = new Schema({
  // Data added by user
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
  },
  uid: {
    type: String,
    required: true
  },
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
      maxlength: 20
    },
    facebook: {
      type: String,
    }
  },
  dob: {
    type: Date,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 3000,
    default: ''
  },
  favoriteCategories: [{
    type: String,
    validate: {
      validator: (s) => s.toLowerCase() in defaultCategories,
      message: props => `${props.value} is not a valid category`
    }
  }],
  wishlist: {
    type: Array,
    default: []
  },
  appliedList: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },

  // App-generate data
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

module.exports = mongoose.model('User', userSchema);
