const jwt = require('jsonwebtoken');
const { UnAuthtorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new UnAuthtorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    next(new UnAuthtorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
