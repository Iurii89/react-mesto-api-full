const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  BadRequest, NotFound, Conflict, Unauthorized,
} = require('../errors/index');

const sendUsers = (req, res) => {
  res.status(200).send(req.users);
};

const sendUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => { res.status(200).send({ data: user }); })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('В id пользователя ошибка');
        return next(error);
      }
      return next(err);
    });
};

const getMe = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => {
      throw new NotFound('Требуется регистрация');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Email уже используется');
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      });
      res.status(200).send({
        email, name, about, avatar,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильный email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new Unauthorized('Неправильный email или пароль');
          }
          return user;
        });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret');
      res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Информация не обновлена. Ошибка данных');
        return error;
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound('Такого пользователя не существует');
    })
    .then((avatarka) => res.status(200).send({ data: avatarka }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Информация не обновлена. Ошибка данных');
        return error;
      }
      return next(err);
    });
};

module.exports = {
  sendUsers,
  sendUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMe,
};
