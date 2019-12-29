const authRout = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');


authRout.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
authRout.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = authRout;