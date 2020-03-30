const graphql = require('graphql');
// const _ = require('lodash');
const { User, Org } = require('../models');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  // GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

const OrgType = new GraphQLObjectType({
  name: 'OrganizationType',
  description: 'Query for organization\'s data',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    contactInfo: { type: new GraphQLObjectType({
      name: 'lmao',
      fields: () => ({
        email : { type: GraphQLString },
        sdt: { type: GraphQLString },
        fbLink: { type :GraphQLString }
      })
    })},
    
    category: { type: GraphQLList(GraphQLString) },
      
    description: { type: GraphQLString },
    logo: { type: GraphQLString },
    thongtintuyensinh: { type: new GraphQLObjectType({
      name: 'lmao2',
      fields: () => ({
        jobDescrition: { type: GraphQLString },
        deadline: { type: GraphQLString },
        linkDon: { type: GraphQLString },
      })
    })},
  })
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Person',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    ava: { type: GraphQLString },
    bio: { type: GraphQLString }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query',
  fields: {
    orgs: {
      type: new GraphQLList(OrgType),
      resolve() {
        return Org.find({});
      }
    },
    org: {
      type: OrgType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Org.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        return User.findById(args.id);
      }
    },    
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
