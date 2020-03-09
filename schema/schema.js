const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

const OrganizationType = new GraphQLObjectType({
  name: 'Organization Type',
  description: 'Query for organization\'s data',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User Type',
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
    hi: {
      type: GraphQLString,
      resolve: () => 'Hello World'
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
