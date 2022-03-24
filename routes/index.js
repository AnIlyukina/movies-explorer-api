const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');

const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');

const { NotFoundError } = require('../errors');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError(`Aдреса ${req.path} не существует`));
});

exports.routes = routes;
