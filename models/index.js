const mongoose = require('mongoose');
const User = require('./User');
const Org= require('./Org');

mongoose.connect('mongodb+srv://duc0905:abcd1234@projectube-qqjul.gcp.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = {
  User,
  Org,
  connection: db,
};
