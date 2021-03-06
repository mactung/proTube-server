const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const { Org, Event } = require('../models');

const oAuth2Client = new OAuth2(
  process.env.OAUTH2_CLIENT_ID,
  process.env.OAUTH2_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

module.exports.deleteAllEvents = function () {

  return Event.find({})
    .then(docs => {
      const eventPromises = docs.map(({ _id }) => {
        // delete all on google calendar
        return new Promise((resolve, reject) => {
          calendar.events.delete({
            calendarId: 'primary',
            eventId: _id.toString()
          }, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
          });
        });
      });

      return Promise.all(eventPromises);
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        Event.deleteMany({}, err => {
          if (err) return reject(err);
          return resolve();
        });
      });
    })
    .then(() => {
      // delete all reference in org doc. tips: does not need to erase each individual event in the array, just delete all at once
      return Org.find({})
        .then(docs => {
          const orgPromises = docs.map(doc => {
            doc.events.length = 0;
            return doc.save();
          });

          return Promise.all(orgPromises);
        });
    })
    .then(() => console.log('Deleted all events'));
};

/**
 * @param {String} orgID - org's document id on databse
 * @param {Object} eventData
 *   @param {String} title
 *   @param {String} content
 *   @param {String} location
 *   @param {Date} startDate
 *   @param {Date} dueDate
 * 
 * @return {Promise}
 */
module.exports.createEvent = function (orgID, eventData) {
  const newEvent = new Event({
    title: eventData.title,
    content: eventData.content,
    location: eventData.location,
    startDate: eventData.startDate,
    dueDate: eventData.dueDate,
    org: orgID
  });

  return newEvent.save()
    .then(() => { // find org
      return Org.findById(orgID);
    })
    .then(org => { // update org's event array
      org.events.push(newEvent._id);

      return org.save();
    })
    .then(() => { // create event on google calendar
      const event = {
        'id': newEvent._id,
        'summary': eventData.title,
        'location': eventData.location,
        'description': eventData.content,
        'start': {
          'dateTime': new Date(eventData.startDate),
        },
        'end': {
          'dateTime': new Date(eventData.dueDate),
        },
      };

      //   google calendar api client library does not support 
      // Promise so have to handle it manually.
      return new Promise((resolve, reject) => {
        calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        }, (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
      });
    });
};