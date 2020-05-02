const admin = require('firebase-admin');
const { User } = require('../models');
// function editProfile()

/**
 *   This function should be called after user
 * has verified his or her email.
 *   This function creates user's mongoDB 
 * document only
 */
function createUserDocument(uid) {
  // use Firebase to get user's info
  // use User model to create
}


/**
 *    This function should be called when user
 *  submit sign up form
 *    This function creates Firebase user only
 */
function userSignUp(userData) {
  // use Firebase to send verification email
  return admin.auth().createUser({
    email: userData.email,
    password: userData.password,
    displayName: userData.name,
    phoneNumber: userData.phoneNumber,
    emailVerified: false,
    disabled: false
  })
    .then(userRecord => {
      const newUser = new User({
        uid: userRecord.uid,
        name: userData.name,
        dob: userData.dob,
        bio: userData.bio,
        contact: {
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          facebook: userData.facebook,
        },
        avatar: userData.avatar,
        gender: userData.gender,
        favoriteCategories: userData.favoriteCategories,
        notifications: []
      });

      return newUser.save()
        .then(() => { // Since the code inside need to access userRecord so I write the .then inside of .then
          // Cannot use Firebase uid as objectId so create custom claim to store mongoDB id
          // Create custom claims for user`
          const customClaims = {
            _id: newUser._id,
            accountType: 'user',
            createdDocument: false,
          };

          return admin.auth()
            .setCustomUserClaims(userRecord.uid, customClaims)
            .then(() => {
              return admin.auth()
                .createCustomToken(userRecord.uid);
            });
        });
    })
    .catch(console.log);
}

module.exports = {
  userSignUp
};
