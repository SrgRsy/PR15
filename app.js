require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const cards = require('./routes/cards');
const users = require('./routes/users');
const authoriz = require('./routes/authoriz');
const NotFoundError = require('./errors/not-found-err');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//подключаемся к серверу монго
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});




app.use('/', authoriz);
app.use('/users', users);
app.use('/cards',cards);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
})

app.use(auth);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка': message});
});







app.listen(PORT, () => {
  console.log(`Используется порт ${PORT}`);
})


