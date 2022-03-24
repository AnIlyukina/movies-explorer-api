const express = require('express');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

const {
  validateMovie, validateId,
} = require('../middlewares/validation');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', express.json(), validateMovie, createMovie);

moviesRoutes.delete('/:id', validateId, deleteMovie);

exports.moviesRoutes = moviesRoutes;
