const { CelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  }

  if (err.status) {
    console.log('errorHandler первая ошибка');
    return res.status(err.status).send({ message: err.message });
  }

  console.log('errorHandler вторая ошибка');
  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
