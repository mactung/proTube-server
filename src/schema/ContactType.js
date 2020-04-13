const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'ContactType',
  fields: () => ({
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    facebook: { type: GraphQLString },
  })
});

module.exports = ContactType;
