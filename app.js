const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
  console.log('сервер запущен');
}

main();
