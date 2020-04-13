// const {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLID,
// } = require('graphql');
// const OrgType = require('./OrgType');

// const { Org } = require('../models');

// module.exports = new GraphQLObjectType({
//   name: 'Event',
//   description: 'Events created by Organizations',
//   fields: () => ({
//     _id: { type: GraphQLID },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     location: { type: GraphQLString },
//     startDate: { type: GraphQLString },
//     dueDate: { type: GraphQLString },
//     org: {
//       type: OrgType,
//       resolve: parent => {
//         // console.log(parent.org);
//         // console.log(OrgType);

//         return Org.findById(parent.org);
//         // return '1';
//       }
//     }
//   })
// });

// // module.exports = EventType;
