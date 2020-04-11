const mongoose = require('mongoose'); 
const User = require('./User');
const Org = require('./Org');
const Event = require('./Event');

mongoose.connect(`
  mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@projectube-qqjul.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
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
  Event,
  connection: db,
};
