const { User, Org, connection } = require('../models');

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

let users = require('./users.json');
let orgs = require('./orgs.json');

connection.once('open', () => {
  User.deleteMany({}, (err) => {
    if (err) {
      console.log('error while deleting user collection: ' + err);
    } else {
      const promises = users.map(user => {
        let newUser = new User(user);
        newUser.save();
      });
  
      Promise.all(promises)
        .then(() => {
          console.log('finished seeding users');
          status.update();
        })
        .catch(err => console.log('Error while seeding users: ' + err));
    }
  });

  Org.deleteMany({}, (err) => {
    if (err) {
      console.log('error while deleting org collection: ' + err);
    } else {
      const promises = orgs.map(org => {
        let newOrg = new Org(org);
        return newOrg.save();
      });

      Promise.all(promises)
        .then(() => {
          console.log('finished seeding orgs');
          status.update();
        })
        .catch(err => console.log('Error while seeding orgs: ' + err));
    }
  });
});


