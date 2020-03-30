const graphql = require('graphql');
const _ = require('lodash');
const user = require('../models/user');
const org = require('../models/org')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;



const OrgType = new GraphQLObjectType({
  name: 'OrganizationType',
  fields: () => ({
    id: {type: GraphQLID},
    name: { type: GraphQLString },
    contactInfo: {type: new GraphQLObjectType({
      name: 'lmao',
      fields: () => ({
        email : {type: GraphQLString},
        sdt: {type: GraphQLString},
        fbLink: {type :GraphQLString}
      })
    })},
    
    category: {type: GraphQLList(GraphQLString)},
      
    description: {type: GraphQLString},
    logo: {type: GraphQLString},
    thongtintuyensinh: {type: new GraphQLObjectType({
      name: 'lmao2',
      fields: () => ({
        jobDescrition: {type: GraphQLString},
        deadline: {type: GraphQLString},
        linkDon: {type: GraphQLString},
      })
    })},
  })
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {type: GraphQLID},
    name: { type: GraphQLString },
    dob: { type: GraphQLString },
    ava: { type: GraphQLString },
    bio: {type: GraphQLString}
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query',
  fields: {
    org: {
      type: OrgType,
      args:{name: {type: GraphQLString}},
      resolve(parent, args){
        return Org.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args:{name: {type: GraphQLString}},
      resolve(parent, args){
        return User.findById(args.id);
      }
    },
    users :{
      type: new GraphQLList(UserType),
      resolve(parent,args){
        return users
      }
    },
    orgs: {
      type: new GraphQLList(OrgType),
      resolve(parent,args){
      return orgs
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
