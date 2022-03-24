const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messageError = err.message || 'Произошла ошибка на стороне сервера';

  res.status(statusCode).send({ message: messageError });

  next();
};

module.exports = errorHandler;
