const connection = require('mongoose').connection;

require('../initApps')();

const { createOrg, deleteAllOrgs } = require('../functions/org');
const { createEvent, deleteAllEvents } = require('../functions/event');

function createStatus() {
  let status = 0;
  const END_STATUS = 2;

  function update() {
    status++;

    if (status === END_STATUS) {
      exit();
    }
  }

  function exit() {
    connection.close(() => console.log('Finished seeding data'));
  }

  return { update };
}

const status = createStatus();

// let users = require('./users.json');
let orgs = require('./orgs.json');
let events = require('./events.json');

/**
 * This file should only use existing functions to refresh services
 */

connection.once('open', () => {
  // User.deleteMany({}, (err) => {
  //   if (err) {
  //     return console.log('error while deleting user collection: ' + err);
  //   }
  //   const promises = users.map(user => {
  //     let newUser = new User({
  //       ...user,
  //       dob: new Date(user.dob)
  //     });
  //     newUser.save();
  //   });

  //   Promise.all(promises)
  //     .then(() => {
  //       console.log('finished seeding users');
  //       status.update();
  //     }) 
  //     .catch(err => console.log('Error while seeding users: ' + err));
  // });

  console.log('Start seeding');

  deleteAllOrgs()
    .then(deleteAllEvents)
    .then(() => {
      return Promise.all(orgs.map(createOrg))
    })
    .then(orgs => {
      console.log('Finished seed orgs');
      status.update(); // finished seed orgs

      return Promise.all(events.map(event => {
        const orgId = orgs[event.org]._id;
        return createEvent(orgId, event);
      }))
    })
    .then(() => {
      console.log('Finished seed events');
      status.update();
    })
    .catch(console.log);
});