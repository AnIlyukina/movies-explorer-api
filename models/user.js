const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная строка 2 символа'],
    maxlength: [30, 'Максимальная строка 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isURL(email);
      },
      message: 'Некорректный URL',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Минимальная длина пароля 8 символов'],
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(new Error('Неправильные почта или пароль'));
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
