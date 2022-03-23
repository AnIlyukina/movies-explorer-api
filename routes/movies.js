const express = require('express');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', express.json(), createMovie);

moviesRoutes.delete('/', deleteMovie);

exports.moviesRoutes = moviesRoutes;
