const { User, Org } = require('../models');

const UserType = require('./UserType');
const OrgType = require('./OrgType');

const { 
  GraphQLObjectType ,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

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
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return User.find(
          {},
          null,
          { limit: args.limit ? args.limit : 10 }
        );
      }
    },
    user: {
      type: UserType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve: (parent, args) => {
        return User.findById(args.id);
      }
    },
  })
});

module.exports = RootQueryType;
