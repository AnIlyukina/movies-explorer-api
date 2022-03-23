const {
  NotFoundError, BadRequestError,
} = require('../errors');

const User = require('../models/user');

exports.getMyUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
    res.send(currentUser);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
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
    } else {
      next(err);
    }
  }
};
