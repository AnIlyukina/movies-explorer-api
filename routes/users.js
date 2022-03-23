const express = require('express');

const {
  getMyUser, updateMyUserInfo,
} = require('../controllers/user');

const usersRoutes = express.Router();

usersRoutes.get('/me', getMyUser);

usersRoutes.put('/me', updateMyUserInfo);

exports.usersRoutes = usersRoutes;
