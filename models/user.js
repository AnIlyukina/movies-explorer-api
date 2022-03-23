const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('User', userSchema);
