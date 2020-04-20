module.exports = {
  Org: {
    notifications: (parent, _, context) => {
      if (context.user._id === parent._id) {
        return parent.notifications;
      }
      return [];
    }
  },
};
