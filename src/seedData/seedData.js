const { User, Org, Event, connection } = require('../models');

function createStatus() {
  let status = 0;
  const END_STATUS = 3;

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

let users = require('./users.json');
let orgs = require('./orgs.json');
let events = require('./events.json');


connection.once('open', () => {
  User.deleteMany({}, (err) => {
    if (err) {
      return console.log('error while deleting user collection: ' + err);
    }
    const promises = users.map(user => {
      let newUser = new User({
        ...user,
        dob: new Date(user.dob)
      });
      newUser.save();
    });

    Promise.all(promises)
      .then(() => {
        console.log('finished seeding users');
        status.update();
      })
      .catch(err => console.log('Error while seeding users: ' + err));
  });

  Org.deleteMany({}, (err) => {
    if (err) {
      return console.log('error while deleting org collection: ' + err);
    }

    const promises = orgs.map(org => {
      let newOrg = new Org(org);
      return newOrg.save();
    });

    Promise.all(promises)
      .then((promises) => {
        console.log('finished seeding orgs');

        Event.deleteMany({}, err => {
          if (err) {
            return console.log('error while deleting events: ' + err);
          }

          let eventPromises = events.map(e => {
            e.org = promises[e.org]._id;

            let newEvent = new Event(e);
            return newEvent.save()
              .then(() => Org.findById(e.org))
              .then(org => {
                console.log('org: ' + org._id);
                org.events.push(newEvent._id);

                return org.save();
              });
          });

          return Promise.all(eventPromises)
            .then(() => {
              console.log('Finished seeding events');

              status.update();
            });
        });

        status.update();
      })
      .catch(err => console.log('Error while seeding orgs: ' + err));
  });
});


