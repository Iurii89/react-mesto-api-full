const Card = require('../models/cards');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      req.cards = cards;

      next();
    })
    .catch(next);
};

module.exports = getCards;
