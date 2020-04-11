const graphql = require('graphql');
const { User, Org } = require('../models');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

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

const EventType = new GraphQLObjectType({
  name: 'PostType',
  description: 'Orgs\' posts',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    location: { type: GraphQLString },
    startDate: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    org: {
      type: OrgType,
      resolve: parent => {
        return Org.findById(parent.org);
      }
    }
  })
});

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query',
  args: {
    limit: { type: GraphQLInt }
  },
  fields: () => ({
    orgs: {
      type: new GraphQLList(OrgType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return Org.find(
          {}, 
          null, 
          { limit: args.limit ? args.limit : 10 });
      }
    },
    org: {
      type: OrgType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve(_, args) {
        return Org.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return User.find({
          limit: args.limit ? args.limit : 10
        });
      }
    },
    user: {
      type: UserType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve: (parent, args) => {
        return User.findById(args.id);
      }
    },
    
  })
});

const RootMutation = new GraphQLObjectType({
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

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
