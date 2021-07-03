const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helpers.message('Невалидная ссылка');
    }),
  }).unknown(true),
});

module.exports = createCardValidator;
