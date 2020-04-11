const { User, Org } = require('../models');

const UserType = require('./UserType');
const OrgType = require('./OrgType');

const { 
  GraphQLObjectType ,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql');

const RootMutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutation',
  fields: {
    addOrg: {
      type: OrgType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        contactInfo: {
          type: new GraphQLInputObjectType({
            name: 'lmao3',
            fields: () => ({
              email: { type: GraphQLString },
              sdt: { type: GraphQLString },
              fbLink: { type: GraphQLString }
            })
          })
        },

        category: { type: GraphQLList(GraphQLString) },

        description: { type: GraphQLString },
        logo: { type: GraphQLString },
        thongtintuyensinh: {
          type: new GraphQLInputObjectType({
            name: 'lmao4',
            fields: () => ({
              jobDescrition: { type: GraphQLString },
              deadline: { type: GraphQLString },
              linkDon: { type: GraphQLString },
            })
          })
        }

      },
      resolve(parent, args) {
        let org = new Org({
          id: args._id,
          name: args.name,
          contactInfo: {
            email: args.contactInfo.email,
            sdt: args.contactInfo.sdt,
            fbLink: args.contactInfo.fbLink
          },

          category: args.category,

          description: args.description,
          logo: args.logo,
          events: []
        });
        return org.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        dob: { type: GraphQLString },
        ava: { type: GraphQLString },
        bio: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          _id: args._id,
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

module.exports = RootMutationType;
