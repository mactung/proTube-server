const graphql = require('graphql');
// const _ = require('lodash');
const { User, Org } = require('../models');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  // GraphQLInt,
  GraphQLInputObjectType,
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

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutation',
  fields: {
    addOrg: {
      type: OrgType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        contactInfo: { type: new GraphQLInputObjectType({
          name: 'lmao3',
          fields: () => ({
            email : { type: GraphQLString },
            sdt: { type: GraphQLString },
            fbLink: { type :GraphQLString }
          })
        })},
        
        category: { type: GraphQLList(GraphQLString) },
          
        description: { type: GraphQLString },
        logo: { type: GraphQLString },
        thongtintuyensinh: { type: new GraphQLInputObjectType({
          name: 'lmao4',
          fields: () => ({
            jobDescrition: { type: GraphQLString },
            deadline: { type: GraphQLString },
            linkDon: { type: GraphQLString },
          })
        })}

      },
      resolve(parent, args){
        let org = new Org({
          id: args._id,
          name: args.name,
          contactInfo: {
              email : args.contactInfo.email,
              sdt: args.contactInfo.sdt,
              fbLink: args.contactInfo.fbLink
          },
          
          category: args.category,
            
          description: args.description,
          logo: args.logo,
          thongtintuyensinh: {
              jobDescrition: args.thongtintuyensinh.jobDescrition,
              deadline: Date.parse(args.thongtintuyensinh.deadline),
              linkDon: args.thongtintuyensinh.linkDon,
        }
      });
        return org.save();
      }
    }
    ,
    addUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        dob: { type: GraphQLString },
        ava: { type: GraphQLString },
        bio: { type: GraphQLString },
      },
      resolve(parent, args){
        let user = new User({
          id: args._id,
          name: args.name,
          dob: Date.parse(args.dob),
          ava: args.ava,
          bio: args.bio,
        });
        return user.save();
      }
    }
}
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
