const { userSignUp } = require('../../functions/user');

module.exports = {
  Mutation: {
    userSignUp: (_, args) => {
      return userSignUp(args);
    }
  },
};
