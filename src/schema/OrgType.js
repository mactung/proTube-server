const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');
const NotificationType = require('./NotificationType');

const { Event, Org } = require('../models');

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
    categories: { type: new GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    logo: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve: parent => {
        return parent.events.map(id => Event.findById(id));
      }
    },
    notifications: {
      type: new GraphQLList(NotificationType)
    }
  })
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Events created by Organizations',
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

module.exports = OrgType;
module.exports.EventType = EventType;
