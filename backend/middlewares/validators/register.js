const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const registerValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Минимум 8 символов',
        'any.required': 'Обязательное поле',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }

      return helpers.message('Невалидный email');
    }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Обязательное поле',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helpers.message('Невалидный avatar');
    }),
  },
});

module.exports = registerValidator;
