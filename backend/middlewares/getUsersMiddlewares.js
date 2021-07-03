const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      req.users = users;

      next();
    })
    .catch(next);
};

module.exports = getUsers;
