const express = require('express');

const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');

const { NotFoundError } = require('../errors');

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(`Aдреса ${req.path} не существует`));
});

exports.routes = routes;
