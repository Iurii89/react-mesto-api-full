const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helpers.message('Невалидная ссылка');
    }),
  }).unknown(true),
});

module.exports = updateAvatarValidator;
