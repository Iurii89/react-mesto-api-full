const Card = require('../models/cards');
const { NotFound, Forbidden, BadRequest } = require('../errors/index');

const sendCards = (req, res) => {
  res.status(200).send(req.cards);
};

const sendCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => { res.status(200).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('В id карточки ошибка');
        return next(error);
      }
      return next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequest('Карточка не создана, ошибка данных');
        return next(error);
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFound('Карточка с таким идентификатором не найдена');
    })
    .then((card) => {
      console.log(req.user._id, card.owner);
      // eslint-disable-next-line eqeqeq
      if (req.user._id == card.owner) {
        card.remove();
        res.status(200).send(card);
      } else throw new Forbidden('Вы можете удалять только свои карточки');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Введённые данные некорректы');
        return next(error);
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((dislike) => res.status(200).send({ data: dislike }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Введённые данные некорректы');
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  sendCards,
  sendCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
