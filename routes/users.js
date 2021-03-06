const express = require('express');

const {
  getMyUser, updateMyUserInfo,
} = require('../controllers/user');

const { validateUserUpdate } = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/me', getMyUser);

usersRoutes.patch('/me', validateUserUpdate, updateMyUserInfo);

exports.usersRoutes = usersRoutes;
