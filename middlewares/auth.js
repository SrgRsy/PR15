const jwt = require('jsonwebtoken');
const AuthorizError = require('../errors/authoriz-err');



module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;


  const extractBearerToken = (header) => {
    return header.replace('Bearer ', '');
  };
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizError('Авторизуйтесь'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (next) {
    return next(new AuthorizError('Авторизуйтесь'));
  }
  req.user = payload;

  next();
};



