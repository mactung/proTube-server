const { User, Org, Event } = require('../models');

const admin = require('firebase-admin');

/**
 * 
 * @param {Object} userData - payload
 * @param {String} userData.email
 * @param {String} userData.password
 * @param {String} userData.displayName
 */
function createUser(userData) {
  admin.auth().createUser({
    email: userData.email,
    password: userData.password,
    displayName: userData.displayName || userData.email,
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
    })
    .then(customToken => {
      console.log(customToken);
    })
    .catch(err => console.log(err));

}

function createOrg(orgData) {
  const newOrg = new Org({ ...orgData });

  newOrg.save();
}

function createEvent(orgId, eventData) {
  const org = Org.findById(orgId);

  const newEvent = new Event({
    ...eventData,
    org: orgId
  });

  org.events = [...org.events, newEvent._id];

  org.save();
}

function authorize(docId, { id }) {
  return docId == id;
}

module.exports = {
  createUser,
  createOrg,
  createEvent,
  authorize
};