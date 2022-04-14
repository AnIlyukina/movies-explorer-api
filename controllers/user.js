const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  NotFoundError, BadRequestError, ConflictRequestError, UnAuthtorizedError,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    if (!body.email || !body.password) {
      throw new BadRequestError('Не верный email или пароль');
    }

    const salt = await bcrypt.genSalt(SOLT_ROUND);
    body.password = await bcrypt.hash(body.password, salt);
    const user = await User.create(body);

    res.status(201).send({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ConflictRequestError('Такой пользователь уже существует'));
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userEmail = await User.findUserByCredentials(email, password);
    if (userEmail) {
      const token = jwt.sign(
        { _id: userEmail._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .status(200).send({ token });
    }
  } catch (err) {
    next(new UnAuthtorizedError('Неправильная почта или пароль'));
  }
};

exports.signout = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new UnAuthtorizedError('Пользователь не авторизован');
    }
    res.clearCookie('token').send({ message: 'Успешно!' });
  } catch (err) {
    next(err);
  }
};

exports.getMyUser = async (req, res, next) => {
  try {
    console.log(req);
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
    res.send(currentUser);
  } catch (err) {
    next(err);
  }
};

exports.updateMyUserInfo = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const userInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true },
    );
    res.send(userInfo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ConflictRequestError('Такой пользователь уже существует'));
    } else {
      next(err);
    }
  }
};
