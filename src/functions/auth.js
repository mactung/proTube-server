const admin = require('firebase-admin');
const { User, Org } = require('../models');

/**
 * All function should return a Promise
 */

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
  signUp,
  registerOrg,
  authorize,
};
