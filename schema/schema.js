const graphql = require('graphql');
const { User, Organization } = require('../models');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

const OrganizationType = new GraphQLObjectType({
  name: 'OrganizationType',
  description: 'Query for organization\'s data',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Person',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return User.findById(args.id);
      }
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve: () => {
        return Organization.find({});
      }
    },
    organization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return Organization.findById(args.id);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
