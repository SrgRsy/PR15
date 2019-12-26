// импорт модели
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');


module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => {
      if (!user) {
        throw new NotFoundError("Данные указаны неверно");
      }
      res.send({ message: "Пользователь создан" });
    })
    .catch(next);
};


module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      }
      res.send(user);
    })
    .catch(next);
}


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(next);
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;


  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: "7d" });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).send({ token })
    })

    .catch(next);


};

