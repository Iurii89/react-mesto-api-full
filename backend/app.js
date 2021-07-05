require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('open', () => console.log('DB connected'));
mongoose.connection.on('error', () => console.log('Ошибка подключения базы "DB" с "mongoose"'));

const PORT = 3001;
const router = require('./routes');
const pageNotFound = require('./controllers/pageNotFound');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);
// app.use(helmet());

app.use(express.json());

app.use(requestLogger);
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  methods: 'GET, POST, PATCH, DELETE, OPTIONS, PUT',
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);

app.use(errors());
app.use('*', pageNotFound);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
