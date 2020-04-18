const { Org, User, Event } = require('../models');
const { 
  searchForUsers,
  searchForOrgs,
  searchForEvents
} = require('../functions/functions');

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
      }
    }
  },
  User: {
    wishlist: (parent, _, context) => {
      if (context.user._id === parent._id) {
        return parent.wishlist.map(orgId => Org.findById(orgId));
      }
      return [];
    },
    appliedList: (parent, _, context) => {
      if (context.user._id === parent._id) {
        return parent.appliedList.map(orgId => Org.findById(orgId));
      }
      return [];
    },
    following: (parent, _, context) => {
      if (context.user._id === parent._id) {
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
  Org: {
    notifications: (parent, _, context) => {
      if (context.user._id === parent._id) {
        return parent.notifications;
      }
      return [];
    }
  },
  SearchResult: {
    users: (parent, _, context) => {
      return searchForUsers(context.args.str, context.args.filters);
    },
    orgs: (parent, _, context) => {
      return searchForOrgs(context.args.str, context.args.filters);
    },
    events: (parent, _, context) => {
      return searchForEvents(context.args.str, context.args.filters);
    },
  }
};
