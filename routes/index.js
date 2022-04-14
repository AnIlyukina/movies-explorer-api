const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login, signout } = require('../controllers/user');

const { validateLogin, validateUser } = require('../middlewares/validation');

const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');

const { NotFoundError } = require('../errors');

const routes = express.Router();

routes.post('/signup', validateUser, createUser);
routes.post('/signin', validateLogin, login);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.post('/logout', signout);

routes.use((req, res, next) => {
  next(new NotFoundError(`Aдреса ${req.path} не существует`));
});

exports.routes = routes;
