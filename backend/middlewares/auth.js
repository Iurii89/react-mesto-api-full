const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Нет токена');
  }
  const token = authorization.replace(/* /^Bearer / */ 'Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new Unauthorized('Ошибка авторизации');
  }
  next();
};

module.exports = auth;
