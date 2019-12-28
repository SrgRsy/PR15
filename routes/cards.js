const cardsRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard,getCard,deleteCard } = require('../controllers/cards');

cardsRout.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createCard);
cardsRout.delete('/:cardId', deleteCard);
cardsRout.get('/', getCard);


module.exports = cardsRout;
