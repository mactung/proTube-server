const { User, Org, Event } = require('../models');

const admin = require('firebase-admin');

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

function registerOrg(orgData) {
  admin.auth().createUser({
    email: orgData.email,
    password: orgData.password,
    displayName: orgData.name,
    emailVerified: false,
    photoURL: orgData.photoURL,
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

function createEvent(orgId, eventData) {
  const org = Org.findById(orgId);

  const newEvent = new Event({
    ...eventData,
    org: orgId
  });

  org.events.push(newEvent._id);
  org.save();
}

function authorize(docId, { id }) {
  return docId == id;
}

module.exports = {
  createUser,
  registerOrg,
  createEvent,
  authorize
};