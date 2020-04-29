const RootQuery = require('./RootQuery');
const UserType = require('./UserType');
const OrgType = require('./OrgType');
const EventType = require('./EventType');
const Search = require('./Search');
const commonTypes = require('./commonTypes');

const RootMutation = require('./RootMutation');

module.exports = [
  RootQuery,
  UserType,
  OrgType,
  EventType,
  Search,
  commonTypes,
  RootMutation
];
