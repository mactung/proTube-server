const { Org, User } = require('../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const NotificationType = require('./NotificationType');
const ContactType = require('./ContactType.js');
const OrgType = require('./OrgType');

const { authorize } = require('../functions/functions');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Person',
  fields: () => ({
    _id: { type: GraphQLID },
    // Public data
    name: { type: GraphQLString },
    contact: { type: ContactType },
    dob: {
      type: GraphQLString,
      resolve: parent => parent.dob.toString()
    },
    ava: { type: GraphQLString },
    bio: { type: GraphQLString },

    // Private data
    wishlist: {
      type: new GraphQLList(OrgType),
      resolve: (parent, _, c) => {
        if (
          !authorize(parent._id, c.args) ||
          !parent.wishlist
        ) {
          return [];
        }

        return parent.wishlist.map(orgId => Org.findById(orgId));
      }
    },
    appliedList: {
      type: new GraphQLList(OrgType),
      resolve: (parent, _, c) => {
        if (
          !authorize(parent._id, c.args) ||
          !parent.appliedList
        ) {
          return [];
        }

        return parent.appliedList.map(orgId => Org.findById(orgId));
      }
    },
    following: {
      type: new GraphQLList(UserType),
      resolve: (parent, _, c) => {
        if (
          !authorize(parent._id, c.args) ||
          !parent.following
        ) {
          return [];
        }
        // populate data
        return parent.following.map(userId => User.findById(userId));
      }
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      resolve: (parent, _, c) => {
        if (
          !authorize(parent._id, c.args) ||
          !parent.notifications
        ) {
          return [];
        }

        return parent.notifications;
      }
    }
  }),
});

module.exports = UserType;
