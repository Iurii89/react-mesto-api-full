const loginValidator = require('./login');
const registerValidator = require('./register');
const sendUserValidator = require('./sendUser');
const updateUserValidator = require('./updateUser');
const updateAvatarValidator = require('./updateAvatar');
const CardIdValidator = require('./cardId');
const createCardValidator = require('./createCard');

module.exports = {
  loginValidator,
  registerValidator,
  sendUserValidator,
  updateUserValidator,
  updateAvatarValidator,
  CardIdValidator,
  createCardValidator,
};
