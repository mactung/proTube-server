const { User, Org, Event } = require('../models');

/**
 * Need improvement for these 3 search func
 */
function searchForUsers(str, filters = {}) {
  return User.find(
    { name: new RegExp(str, 'ig'), ...filters }, 
    null, 
    { limit: 10 }
  );
}

function searchForOrgs(str, filters = {}) {
  return Org.find(
    { name: new RegExp(str, 'ig'), ...filters }, 
    null, 
    { limit: 10 }
  );
}

function searchForEvents(str, filters = {}) {
  return Event.find(
    { title: new RegExp(str, 'ig'), ...filters }, 
    null, 
    { limit: 10 }
  );
}

// TODO: rewrite this function
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
