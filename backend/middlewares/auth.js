const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Нет токена');
  }
  const token = authorization.replace(/^Bearer /, '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throw new Unauthorized('Нет токена');
  }
  next();
};

module.exports = auth;
