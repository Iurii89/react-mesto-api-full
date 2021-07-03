const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message('Невалидный Email');
    }),
    password: Joi.string().min(8).required(),
  }).unknown(true),
});

module.exports = loginValidator;
