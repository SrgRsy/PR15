const cardsRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard,getCard,deleteCard } = require('../controllers/cards');

cardsRout.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().url(),
    name: Joi.string().required().min(2).max(30),
    cardId: Joi.string().required()
  }),
}), createCard);
cardsRout.delete('/:cardId',celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required()
  }),
}), deleteCard);
cardsRout.get('/', getCard);


module.exports = cardsRout;
