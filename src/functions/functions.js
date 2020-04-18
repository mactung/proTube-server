const { User, Org, Event } = require('../models');

function searchForOrgs(str, filters = {}) {
  return Org.find(
    {}, 
    null, 
    { limit: 10, ...filters }
  );
}

function searchForUsers(str, filters = {}) {
  return User.find(
    {}, 
    null, 
    { limit: 10, ...filters }
  );
}

function searchForEvents(str, filters = {}) {
  return Event.find(
    {}, 
    null, 
    { limit: 10, ...filters }
  );
}

function createEvent(orgId, eventData) {
  const org = Org.findById(orgId);

  const newEvent = new Event({
    ...eventData,
    org: orgId
  });

  org.events.push(newEvent._id);
  org.save();
}

function pushNotification(accountType, docId, notification) {
  const models = {
    user: User,
    org: Org
  };
  const model = models[accountType];

  const doc = model.findById(docId);
  doc.notifications.push(notification);
  return doc.save();
}

module.exports = {
  createEvent,
  pushNotification,
  searchForUsers,
  searchForOrgs,
  searchForEvents,
};
