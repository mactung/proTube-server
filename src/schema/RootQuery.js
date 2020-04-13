const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');
const UserType = require('./UserType');
const OrgType = require('./OrgType');
const { EventType } = require('./OrgType');

const { User, Org, Event } = require('../models');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query',
  args: {
    limit: { type: GraphQLInt }
  },
  fields: () => ({
    orgs: {
      type: new GraphQLList(OrgType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return Org.find(
          {},
          null,
          { limit: args.limit ? args.limit : 10 }
        );
      }
    },
    org: {
      type: OrgType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Org.findById(args.id);
      }
    },
    events: {
      type: new GraphQLList(EventType),
      args: { limit: { type: GraphQLInt } },
      resolve: (_, args) => {
        return Event.find(
          {},
          null,
          { limit: args.limit ? args.limit : 10 }
        );
      }
    },
    event: {
      type: EventType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args) => {
        return Event.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return User.find(
          {},
          'name contact dob ava bio',
          { limit: args.limit ? args.limit : 10 }
        );
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args, context) => {
        // return User.findById(args.id);
        context.args = { id: args.id };

        const user = User.findById(args.id);
        return user;
      }
    },
  })
});

module.exports = RootQueryType;
