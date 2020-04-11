const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');

const OrgType = new GraphQLObjectType({
  name: 'OrganizationType',
  description: 'Query for organization\'s data',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    contactInfo: {
      type: new GraphQLObjectType({
        name: 'Contact',
        fields: () => ({
          email: { type: GraphQLString },
          sdt: { type: GraphQLString },
          fbLink: { type: GraphQLString }
        })
      })
    },

    category: { type: new GraphQLList(GraphQLString) },

    description: { type: GraphQLString },
    logo: { type: GraphQLString },
    events: { type: new GraphQLList(GraphQLID) } // array of ids in database
  })
});

module.exports = OrgType;
