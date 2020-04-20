const { 
  searchForUsers,
  searchForOrgs,
  searchForEvents
} = require('../../functions/functions');

module.exports = {
  SearchResult: {
    users: (parent, _, context) => {
      return searchForUsers(context.args.str, context.args.filters);
    },
    orgs: (parent, _, context) => {
      return searchForOrgs(context.args.str, context.args.filters);
    },
    events: (parent, _, context) => {
      return searchForEvents(context.args.str, context.args.filters);
    },
  }
};
