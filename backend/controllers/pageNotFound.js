const { NotFound } = require('../errors/index');

const pageNotFound = (req, res, next) => {
  const error = new NotFound('Запрашиваемая страница не найден');
  return next(error);
};

module.exports = pageNotFound;
