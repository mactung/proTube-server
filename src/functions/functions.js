const { User, Org, Event } = require('../models');

const admin = require('firebase-admin');

function createUser(userData) {
  console.log('Creating user');
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

      // Cannot use uid as _id
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

module.exports = {
  createUser,
  createOrg,
  createEvent,
};