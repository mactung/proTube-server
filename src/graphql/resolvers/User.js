const { User, Org } = require('../../models');

module.exports = {
  User: {
    wishlist: (parent, _, context) => {
      if (context.user && context.user._id === parent._id) {
        return parent.wishlist.map(orgId => Org.findById(orgId));
      }
      return [];
    },
    appliedList: (parent, _, context) => {
      if (context.user && context.user._id === parent._id) {
        return parent.appliedList.map(orgId => Org.findById(orgId));
      }
      return [];
    },
    following: (parent, _, context) => {
      if (context.user && context.user._id === parent._id) {
        return parent.following.map(orgId => User.findById(orgId));
      }
      return [];
    },
    notifications: (parent, _, context) => {
      if (context.user._id === parent._id) {
        return parent.notifications;
      }
      return [];
    }
  },
};
