const admin = require('firebase-admin');
const mongoose = require('mongoose');

const mongodbAddress =
  process.env.NODE_ENV === 'development' ?
    'mongodb://localhost:27017/projectube-test' :
    process.env.MONGODB_ADDRESS
      .replace('<USERNAME>', process.env.MONGODB_USERNAME)
      .replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

console.log(mongodbAddress);

mongoose.connection.once(
  'connect',
  () => console.log('Connected to MongoDB!')
);

module.exports = async function () {
  await admin.initializeApp({
    credential: admin.credential.cert('config/serviceAccount.json'),
  });

  await mongoose.connect(
    mongodbAddress,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};