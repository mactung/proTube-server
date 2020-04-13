const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const NotificationType = new GraphQLObjectType({
  name: 'NotificationType',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

module.exports = NotificationType;
