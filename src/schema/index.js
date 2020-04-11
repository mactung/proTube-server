const { GraphQLSchema } = require('graphql');
const RootQuery = require('./RootQuery');
const RootMutation = require('./RootMutation');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
