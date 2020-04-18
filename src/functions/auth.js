const admin = require('firebase-admin');
const { User, Org } = require('../models');

/**
 * All function should return a Promise
 */

/**
 * @param {Object} userData - payload
 * @param {String} userData.email
 * @param {String} userData.password
 * @param {String} userData.displayName
 * error should be catch where this function is called
 * return Promise with a customToken or error
 */
function createUser(userData) {
  return admin.auth().createUser({
    email: userData.email,
    password: userData.password,
    displayName: userData.name,
    emailVerified: false,
    disabled: false
  })
    .then(userRecord => {
      const newUser = new User({
        uid: userRecord.uid,
        name: userData.name,
        dob: userData.dob,
        contact: {
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          facebook: userData.facebook
        },
        notifications: []
      });
      newUser.save();

      // Cannot use Firebase uid as _id so create custom claim to store mongoDB id
      // Create custom claims for user`
      const customClaims = {
        accountType: 'user',
        _id: newUser._id
      };

      return admin.auth().createCustomToken(userRecord.uid, customClaims);
    });
}

/**
 * This should create a placeholder for organizations until they are
 * accepted by the support team.
 * @param {Object} orgData
 *  @param {String} email
 *  @parma {String} password
 *  @param {string} name
 *  @param {String} photoURL
 */
function registerOrg(orgData) {
  admin.auth().createUser({
    email: orgData.email,
    password: orgData.password,
    displayName: orgData.name,
    photoURL: orgData.photoURL,
    emailVerified: false,
    disabled: true
  })
    .then(record => {
      const newOrg = new Org({
        name: record.displayName,
        contact: {
          email: record.email,
          phoneNumber: record.phoneNumber,
          facebook: orgData.facebook
        },
        dob: orgData.dob,
        logo: orgData.photoURL,
        events: [],
        notifications: [],
        followers: []
      });
      newOrg.save();

      const customClaims = {
        accountType: 'org',
        _id: newOrg._id
      };

      return admin.auth().createCustomToken(record.uid, customClaims);
    });
}

/**
 * This should return a Promise, if success will pass userData to .then
 * @param {Object} headers - headers of the request
 *  @param {String} headers.Authorization - has format 'Bearer blahhblahblahhhh'
 *
 * return a Promise((userData) => {})
 */
function authorize(headers, _id = null) {
  const token = headers.authorization && headers.authorization.split(' ')[1];
  return (
    admin
      .auth()
      .verifyIdToken(token)
      .then(userData => userData._id == _id)
  );
}

module.exports = {
  createUser,
  registerOrg,
  authorize,
};
