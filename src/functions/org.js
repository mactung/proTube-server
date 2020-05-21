const { Org } = require('../models');

module.exports.deleteAllOrgs = function () {
  return new Promise((resolve, reject) => {
    Org.deleteMany({}, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports.createOrg = function (orgData) {
  const newOrg = new Org(orgData);

  return newOrg.save();
};