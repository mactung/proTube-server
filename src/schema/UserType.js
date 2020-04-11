const { Org } = require('../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');

const OrgType = require('./OrgType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Person',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    dob: { type: GraphQLString },
    ava: { type: GraphQLString },
    bio: { type: GraphQLString },
    wishlist: {
      type: new GraphQLList(OrgType),
      resolve: parent => {
        // populate data
        return parent.wishlist.map(orgId => Org.findById(orgId));
      }
    },
  }),
});

module.exports = UserType;
