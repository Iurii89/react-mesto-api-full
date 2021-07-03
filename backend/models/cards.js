const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Ошибка, адрес аватара указан неверно',
    },
  },

  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  likes: [{
    type: mongoose.Types.ObjectId,
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
