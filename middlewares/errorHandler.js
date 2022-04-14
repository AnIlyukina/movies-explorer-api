const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messageError = statusCode === 500 ? 'Произошла ошибка на стороне сервера' : err.message;

  res.status(statusCode).send({ message: messageError });

  next();
};

module.exports = errorHandler;
