const userRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');


const { getUsers,findUser} = require('../controllers/users');


userRout.get('/', getUsers);
userRout.get('/:id',celebrate({
  body: Joi.object().keys({
    id: Joi.string().required()
  }),
}), findUser);



module.exports = userRout;