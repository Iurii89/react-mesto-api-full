const { celebrate, Joi } = require('celebrate');

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).unknown(true),
});

module.exports = updateUserValidator;
