const express = require('express');

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const helmet = require('helmet');

const rateLimiter = require('./middlewares/rateLimit');

const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { routes } = require('./routes/index');

const { PORT = 3000, MONGOBD_ADDRESS, NODE_ENV } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use(helmet());

app.use(rateLimiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(`${NODE_ENV === 'production' ? MONGOBD_ADDRESS : 'mongodb://localhost:27017/bitfilmsdb'}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
  console.log(`сервер запущен на ${PORT}`);
}

main();
