const { Org, User, Event } = require('../../models');

module.exports = {
  Query: {
    users: (_, args) => {
      return User.find(
        {},
        null,
        { limit: args.limit || 10 }
      );
    },
    user: (_, args) => {
      return User.findById(args.id);
    },
    orgs: (_, args) => {
      return Org.find(
        {},
        null,
        { limit: args.limit || 10 }
      );
    },
    org: (_, args) => {
      return Org.findById(args.id);
    },
    events: (_, args) => {
      return Event.find(
        {},
        null,
        { limit: args.limit || 10 }
      );
    },
    event: (_, args) => {
      return Event.findById(args.id);
    },
    search: (_, args, context) => {
      context.args = args;
      return {
        users: [],
        orgs: [],
        events: []
      };
    }
  }
};
