const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
